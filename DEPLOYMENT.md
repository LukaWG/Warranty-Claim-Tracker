# Deployment Guide

How to build, deploy, and update the Warranty Claim Tracker with Docker — either
with plain Docker Compose on a single host, or on Kubernetes (K3s recommended
for a single local server).

## Architecture

```text
Browser ──> Ingress / host port ──> Next.js app (port 3000, this repo)
                                      ├─> PostgreSQL (Better Auth users/sessions, Prisma)
                                      └─(browser fetches directly)─> Data API (port 5001, separate service)
```

Two external dependencies:

- **PostgreSQL** — stores Better Auth users/sessions. Included in both the
  compose file and the k8s manifests.
- **Data API (`NEXT_PUBLIC_API_URL`, port 5001)** — the claims/sites/brands
  backend that `src/api/databaseClient.js` calls. It is **not in this repo**
  and is called **directly from the user's browser**, so its URL must be
  reachable from user machines, not just from inside the cluster.

## ⚠️ Before deploying: revert the local-dev mocks

This repo carries local-only modifications (see `CLAUDE.md`). For a real
deployment, restore production behaviour:

1. `middleware.ts` — restore the commented-out cookie check (currently allows
   all requests unauthenticated).
2. `src/lib/auth.ts` — make sure the real Better Auth config is active (it
   currently is; the mock is commented out at the bottom).
3. `src/api/databaseClient.js` — confirm the right data layer is active
   (`databaseClientNew.js` is the Prisma-backed version).
4. `src/pages/_app.jsx` — re-enable the commented-out `AuthProvider` wrapper.

## Environment variables

**Build-time (baked into the JS bundle — changing them requires rebuilding the image):**

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Base path for internal navigation | `/` |
| `NEXT_PUBLIC_API_URL` | Data API URL, **as reachable from user browsers** | `http://192.168.1.144:5001` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app itself | `http://warranty.local` |
| `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` | Show the SSO login button | `false` |
| `NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO` | Skip login form, go straight to SSO | `false` |

**Runtime (set on the container — compose `environment:` or the k8s Secret/ConfigMap):**

| Variable | Purpose |
|---|---|
| `AUTH_DATABASE_URL` | Postgres connection string for Better Auth/Prisma |
| `BETTER_AUTH_SECRET` | Session signing secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Public URL users reach the app on (must match ingress host) |
| `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` / `MICROSOFT_TENANT_ID` | Only if SSO is enabled |

## Build the image

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://192.168.1.144:5001 \
  --build-arg NEXT_PUBLIC_APP_URL=http://warranty.local \
  -t lukawg/warranty-repair-tracker:latest .

docker push lukawg/warranty-repair-tracker:latest
```

CI does this automatically: `.github/workflows/deploy.yml` builds and pushes
`lukawg/warranty-repair-tracker:latest` (plus a `:<git-sha>` tag) on every push
to `main`. Set the `NEXT_PUBLIC_*` values as repository **variables** and the
Docker Hub credentials as **secrets** in GitHub.

## Option A — Docker Compose (single host)

`docker-compose.yaml` runs Postgres + the app. Secrets are read from `.env`
(`BETTER_AUTH_SECRET` is required, `POSTGRES_PASSWORD` defaults to `Password`).

```bash
# 1. Start everything (builds the image locally)
docker compose up -d --build

# 2. Create the auth tables (first run, and after any prisma/schema.prisma change)
docker compose --profile setup run --rm db-push

# App: http://<host>:3000   Postgres: <host>:51214
```

**To update:** pull the latest code and `docker compose up -d --build`.
If instead you deploy pre-built images from Docker Hub, uncomment the
`watchtower` service — it polls the registry and auto-restarts the app when a
new `latest` image is pushed.

## Option B — Kubernetes

Manifests live in `k8s/`. They deploy: namespace, ConfigMap, Postgres
(StatefulSet + 5Gi PVC + ClusterIP service), the app (2 replicas, rolling
update, probes), a ClusterIP service, and an Ingress.

### First-time setup

```bash
# 0. On a fresh local server, install K3s (see notes below)

# 1. Namespace
kubectl apply -f k8s/namespace.yaml

# 2. Secrets — see k8s/secret.example.yaml for the full command
kubectl create secret generic warranty-claim-tracker-secrets \
  -n warranty-claim-tracker \
  --from-literal=postgres-password='<strong-password>' \
  --from-literal=auth-database-url='postgresql://adminuser:<strong-password>@postgres:5432/warranty_claim_tracker' \
  --from-literal=better-auth-secret="$(openssl rand -base64 32)"

# OR
kubectl apply -f k8s/secret.yaml

# 3. Set the public URL in k8s/configmap.yaml (better-auth-url), then deploy
kubectl apply -k k8s/

# 4. Wait for Postgres, then create the auth tables
kubectl rollout status statefulset/postgres -n warranty-claim-tracker
kubectl apply -f k8s/db-push-job.yaml
kubectl logs -n warranty-claim-tracker job/db-push -f

# 5. Verify
kubectl get all -n warranty-claim-tracker
kubectl logs -n warranty-claim-tracker -l app=warranty-claim-tracker -f
```

### Access

Point a local DNS name (e.g. `warranty.local`) at the server's IP; the ingress
serves it on port 80. For quick testing without DNS:

```bash
kubectl port-forward -n warranty-claim-tracker svc/warranty-claim-tracker 3000:80
# http://localhost:3000
```

### Updating the app

```bash
# Push a new image (or let CI do it), then:
kubectl rollout restart deployment/warranty-claim-tracker -n warranty-claim-tracker
kubectl rollout status  deployment/warranty-claim-tracker -n warranty-claim-tracker

# To specify a specific image to rollout, then:
kubectl set image deployment/warranty-claim-tracker  warranty-claim-tracker=lukawg/warranty-repair-tracker@sha256:<sha256> -n warranty-claim-tracker
kubectl rollout status  deployment/warranty-claim-tracker -n warranty-claim-tracker
```

`imagePullPolicy: Always` + the `latest` tag means a restart pulls the newest
image. For controlled rollbacks, deploy by sha tag instead:

```bash
kubectl set image deployment/warranty-claim-tracker \
  warranty-claim-tracker=lukawg/warranty-repair-tracker:<git-sha> \
  -n warranty-claim-tracker
# Roll back:
kubectl rollout undo deployment/warranty-claim-tracker -n warranty-claim-tracker
```

If `prisma/schema.prisma` changed, re-run the db-push job (delete first — Jobs
are immutable):

```bash
kubectl delete job db-push -n warranty-claim-tracker --ignore-not-found
kubectl apply -f k8s/db-push-job.yaml
```

### Updating configuration

- **Runtime config** (`BETTER_AUTH_URL`, secrets): edit the ConfigMap/Secret,
  then `kubectl rollout restart deployment/warranty-claim-tracker -n warranty-claim-tracker`.
- **`NEXT_PUBLIC_*` values**: rebuild and push the image with new build args,
  then restart the deployment. Editing the ConfigMap does nothing for these.

### Scaling

```bash
kubectl scale deployment warranty-claim-tracker -n warranty-claim-tracker --replicas=3
```

### K3s notes (single local server)

```bash
curl -sfL https://get.k3s.io | sh -
mkdir -p ~/.kube && sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown "$USER:$USER" ~/.kube/config
```

- K3s ships **Traefik** as the ingress controller; `k8s/ingress.yaml` already
  uses `ingressClassName: traefik`. Change it to `nginx` on clusters running
  ingress-nginx.
- To use a locally built image without a registry:
  `docker save lukawg/warranty-repair-tracker:latest | sudo k3s ctr images import -`
  and set `imagePullPolicy: IfNotPresent` in `k8s/deployment.yaml`.

## Troubleshooting

```bash
kubectl describe pod -n warranty-claim-tracker <pod-name>   # stuck pods, image pull errors
kubectl get events -n warranty-claim-tracker --sort-by=.lastTimestamp
kubectl logs -n warranty-claim-tracker -l app=warranty-claim-tracker --tail=100
kubectl exec -it -n warranty-claim-tracker postgres-0 -- psql -U adminuser warranty_claim_tracker
```

Common issues:

- **Login fails / redirects loop** — `BETTER_AUTH_URL` must exactly match the
  URL in the browser address bar (scheme, host, port).
- **Data never loads but login works** — `NEXT_PUBLIC_API_URL` is wrong or the
  data API isn't reachable *from the user's browser*. Check the browser dev
  tools network tab; remember this value is baked in at build time.
- **`relation "user" does not exist`** — the db-push job hasn't been run.

## Cleanup

```bash
kubectl delete -k k8s/          # keeps the PVC (Postgres data)
kubectl delete namespace warranty-claim-tracker   # deletes everything including data
docker compose down             # compose: add -v to also delete Postgres data
```
