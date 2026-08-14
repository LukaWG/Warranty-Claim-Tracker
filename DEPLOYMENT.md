# Deployment Guide

How to build, deploy, and update the Warranty Claim Tracker with Docker — either
with plain Docker Compose on a single host, or on Kubernetes (K3s recommended
for a single local server).

## Architecture

```text
Browser ──> Ingress / host port ──> Next.js app (port 3000, this repo)
                                      ├─> PostgreSQL (Better Auth users/sessions, Prisma)
                                      └─(server-side)─> /api/data proxy ──> Data API (port 5001, separate service)
```

Two external dependencies:

- **PostgreSQL** — stores Better Auth users/sessions. Included in both the
  compose file and the k8s manifests.
- **Data API (`DATA_API_URL`, port 5001)** — the claims/sites/brands
  backend. It is **not in this repo**. All calls to it go through this app's
  own session- and role-checked proxy (`src/pages/api/data/[...path].ts`),
  which forwards server-side using `DATA_API_KEY`. The browser never talks
  to the Data API directly, so its URL only needs to be reachable from
  inside the cluster/host running this app, not from user machines.

## Pre-deployment notes

The local-dev mocks this repo used to carry (mocked auth, a mocked data
client, a disabled `AuthProvider`) have all been removed from the codebase —
there's nothing left to revert. Two real pre-production items worth a
decision before going live, though:

1. `sendResetPassword` in `src/lib/auth.ts` only logs the password-reset
   link instead of emailing it — password reset won't actually reach real
   users until this is wired to an email sender.
2. `MICROSOFT_TENANT_ID` defaults to `"common"`, which lets any Microsoft
   tenant attempt sign-in (backstopped only by the `@hendy-group.com` email
   check). Fine while SSO is disabled; set it to Hendy's real Entra tenant
   GUID before turning `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` on.

## Environment variables

**Build-time (baked into the JS bundle — changing them requires rebuilding the image):**

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Base path for internal navigation | `/` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app itself | `http://warranty.local` |
| `NEXT_PUBLIC_ENABLE_MICROSOFT_SSO` | Show the SSO login button | `false` |
| `NEXT_PUBLIC_AUTO_LOGIN_MICROSOFT_SSO` | Skip login form, go straight to SSO | `false` |

**Runtime (set on the container — compose `environment:` or the k8s Secret/ConfigMap):**

| Variable | Purpose |
|---|---|
| `AUTH_DATABASE_URL` | Postgres connection string for Better Auth/Prisma |
| `BETTER_AUTH_SECRET` | Session signing secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Public URL users reach the app on (must match ingress host) |
| `DATA_API_URL` | Data API URL, as reachable from inside the cluster/host (not from user browsers) |
| `DATA_API_KEY` | Must match the Data API's `INTERNAL_API_KEY` |
| `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` / `MICROSOFT_TENANT_ID` | Only if SSO is enabled |

## Build the image

```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=http://warranty.local \
  -t lukawg/warranty-claim-tracker:latest .

docker push lukawg/warranty-claim-tracker:latest
```

CI does this automatically: `.github/workflows/deploy.yml` builds and pushes
`lukawg/warranty-claim-tracker:latest` (plus a `:<git-sha>` tag) on every push
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

A real production deployment (a dedicated Linux server or VM running K3s,
not Docker Desktop) is terminal-only end to end — there is no GUI step
anywhere in "First-time setup" below, `systemctl`/`kubectl` cover
install, start/stop, and every day-to-day operation. The Docker Desktop
notes further down only apply to local development on a Mac/Windows
machine.

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
kubectl set image deployment/warranty-claim-tracker  warranty-claim-tracker=lukawg/warranty-claim-tracker@sha256:<sha256> -n warranty-claim-tracker
kubectl rollout status  deployment/warranty-claim-tracker -n warranty-claim-tracker
```

`imagePullPolicy: Always` + the `latest` tag means a restart pulls the newest
image. For controlled rollbacks, deploy by sha tag instead:

```bash
kubectl set image deployment/warranty-claim-tracker \
  warranty-claim-tracker=lukawg/warranty-claim-tracker:<git-sha> \
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
  `docker save lukawg/warranty-claim-tracker:latest | sudo k3s ctr images import -`
  and set `imagePullPolicy: IfNotPresent` in `k8s/deployment.yaml`.

### Running on Docker Desktop Kubernetes (Mac) instead of K3s

Docker Desktop's built-in Kubernetes (Settings → Kubernetes → Enable
Kubernetes) is a single-node cluster running inside Docker Desktop's VM. It
works the same way as the rest of Option B (`kubectl apply -k k8s/`, same
manifests) with two important differences from a native K3s server:

- **No built-in ingress controller.** Unlike K3s, Docker Desktop's
  Kubernetes does not ship Traefik automatically — `k8s/traefik.yaml` in this
  repo installs a minimal one. Apply it once per cluster:

  ```bash
  kubectl apply -f k8s/traefik.yaml
  ```

- **Toggling or resetting Kubernetes wipes everything.** Disabling/re-enabling
  Kubernetes in Docker Desktop settings, or clicking "Reset Kubernetes
  Cluster", deletes every namespace and deployed resource — including
  whatever Traefik install was there before. There is no persistent state to
  recover; you just redeploy from scratch:

  ```bash
  kubectl apply -f k8s/traefik.yaml
  kubectl apply -k k8s/
  kubectl create secret generic warranty-claim-tracker-secrets \
    -n warranty-claim-tracker \
    --from-literal=postgres-password='<strong-password>' \
    --from-literal=auth-database-url='postgresql://adminuser:<strong-password>@postgres:5432/warranty_claim_tracker' \
    --from-literal=better-auth-secret="$(openssl rand -base64 32)"
  kubectl apply -f k8s/db-push-job.yaml
  ```

#### Accessing the cluster from another device

1. Confirm Kubernetes is actually running: Docker Desktop → Settings →
   Kubernetes should show a green "Kubernetes running" status, or check from
   the CLI:

   ```bash
   kubectl config get-contexts
   kubectl cluster-info --context docker-desktop
   ```

   If no context/cluster shows up, Kubernetes has been disabled or hasn't
   finished restarting — re-enable it in Docker Desktop settings, or click
   "Reset Kubernetes Cluster" if it's stuck, then redeploy per above.

2. Verify Traefik is up and has an external port:

   ```bash
   kubectl get pods -n traefik
   kubectl get svc  -n traefik traefik
   ```

   Docker Desktop implements `type: LoadBalancer` services by publishing the
   port directly on the Mac's own network interfaces (the same mechanism as
   `docker run -p`), so `EXTERNAL-IP` will show as `localhost` but the port
   is reachable from the LAN too — no `kubectl port-forward` needed.

3. macOS's firewall (System Settings → Network → Firewall) can silently
   block inbound connections from other devices even though `localhost`
   works fine on the Mac itself. Make sure it isn't set to block all
   incoming connections, and allow Docker Desktop if prompted.

4. From the other device, browse to the Mac's LAN IP — `k8s/ingress.yaml`
   sets an empty `host: ""`, which matches any hostname/IP reaching Traefik,
   so no DNS setup is required:

   ```text
   http://192.168.1.144
   ```

   (matching whatever's set as `better-auth-url` in `k8s/configmap.yaml`; find
   the Mac's current LAN IP with `ipconfig getifaddr en0`). For a friendlier
   name, add a hosts-file entry on the other device instead
   (`192.168.1.144  warranty.local`) — but only if `NEXT_PUBLIC_APP_URL`/
   `better-auth-url` were rebuilt to use that hostname; otherwise stick with
   the raw IP so it matches what's already baked into the running image.

#### Managing Docker Desktop from the terminal

Docker Desktop ships a `docker desktop` CLI, but as of Docker Desktop 4.44 it
does not expose everything the Settings GUI does — know which parts still
require it before relying on the terminal alone:

```bash
docker desktop status              # is Docker Desktop running at all
docker desktop start               # start it
docker desktop stop                # stop it
docker desktop restart             # restart it

kubectl config get-contexts        # confirm docker-desktop context exists
kubectl config use-context docker-desktop
kubectl cluster-info --context docker-desktop

docker desktop kubernetes images   # list the k8s images Docker Desktop manages
```

**Still GUI-only, no CLI equivalent exists today:** enabling Kubernetes for
the first time (Settings → Kubernetes → Enable Kubernetes) and the
"Reset Kubernetes Cluster" button (Settings → Kubernetes → Reset Kubernetes
Cluster). If Kubernetes needs to be toggled on or reset, that one step still
means opening Docker Desktop's Settings — everything after it (redeploying
`k8s/traefik.yaml` and `k8s/`, checking pods/services, accessing from
another device) is scriptable as shown above.

Because of that gap, don't run production on Docker Desktop's Kubernetes —
it's a local-dev convenience, not meant to be operated headlessly. For prod,
use a real Linux server with K3s (see "First-time setup" and "K3s notes"
above), which needs no GUI at any point.

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
