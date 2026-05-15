# Local Server Kubernetes Deployment Guide

This guide explains how to deploy the Warranty Claim Tracker application to a local physical server or local VM.

The recommended local-server setup is:

```text
Users on local network -> local DNS/server IP -> Kubernetes ingress -> Service port 80 -> App pods on port 3000
```

The application is packaged with the root `Dockerfile` and deployed with the manifests in this `k8s/` directory.

## Current Kubernetes Resources

| File | Purpose |
| --- | --- |
| `namespace.yaml` | Creates the `warranty-claim-tracker` namespace. |
| `configmap.yaml` | Stores non-sensitive runtime configuration, currently `base-path: "/"`. |
| `deployment.yaml` | Runs two replicas of the Next.js container with readiness/liveness probes. |
| `service.yaml` | Creates a `ClusterIP` service on port `80`, targeting the app's container port `3000`. |
| `ingress.yaml` | Exposes the service through an ingress controller. |
| `kustomization.yaml` | Applies all resources together with `kubectl apply -k k8s/`. |

## Local Server Prerequisites

- A Linux server or VM, preferably Ubuntu Server 22.04/24.04 LTS.
- A static LAN IP or reserved DHCP lease.
- SSH access to the server.
- Inbound access to ports `80` and `443` from your local network.
- Docker on your build machine, or on the server if you will build there.
- Optional: a local DNS name such as `warranty.local` or `warranty.internal.example.com`.

This guide uses K3s because it is lightweight and straightforward for a single local server.

Reference docs:

- K3s quick start: <https://docs.k3s.io/quick-start>
- ingress-nginx bare-metal notes: <https://kubernetes.github.io/ingress-nginx/deploy/baremetal/>

## 1. Prepare the Server

SSH into the local server.

```bash
ssh <user>@<server-ip>
```

Update the OS.

```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

Reconnect after reboot.

```bash
ssh <user>@<server-ip>
```

Install basic tools.

```bash
sudo apt install -y curl ca-certificates gnupg git
```

Make sure the server has a stable IP address. Either configure a static IP on the server or reserve the address in your router/DHCP server.

## 2. Install K3s

Install K3s.

```bash
curl -sfL https://get.k3s.io | sh -
```

Check that Kubernetes is running.

```bash
sudo k3s kubectl get nodes
```

Allow your normal user to use `kubectl`.

```bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown "$USER:$USER" ~/.kube/config
kubectl get nodes
```

K3s includes the Traefik ingress controller by default. The current `k8s/ingress.yaml` uses `ingressClassName: nginx`, so update it for K3s:

```yaml
spec:
  ingressClassName: traefik
```

## 3. Get the App onto the Server

Clone or copy the repository onto the server.

```bash
git clone <repo-url>
cd Warranty-Claim-Tracker
```

If the repository is already on the server, pull the latest changes.

```bash
git pull
```

## 4. Build the Container Image

For a single local server, the simplest approach is to build the image directly on the server and import it into K3s' container runtime.

Install Docker if it is not already installed.

```bash
sudo apt install -y docker.io
sudo usermod -aG docker "$USER"
```

Log out and back in so the Docker group change applies, then build the image from the repository root.

```bash
docker build -t warranty-claim-tracker:local .
```

Import the image into K3s.

```bash
docker save warranty-claim-tracker:local | sudo k3s ctr images import -
```

Update `k8s/deployment.yaml` to use the local image and avoid pulling from an external registry:

```yaml
image: warranty-claim-tracker:local
imagePullPolicy: IfNotPresent
```

## 5. Configure the App Path

Edit `k8s/configmap.yaml`.

Use `/` if the app will be served from the root of the server or local domain:

```yaml
data:
  base-path: "/"
```

That means users will visit:

```text
http://<server-ip>/
```

or:

```text
http://warranty.local/
```

Only use a path prefix if you intentionally want the app under a subpath:

```yaml
data:
  base-path: "/Warranty-Claim-Tracker"
```

## 6. Configure Local Access

### Option A: Access by Server IP

For a simple local deployment, leave the ingress host empty:

```yaml
rules:
- host: ""
```

Users can visit:

```text
http://<server-ip>/
```

### Option B: Access by Local DNS Name

If your router, DNS server, or internal DNS provider supports local records, create:

```text
warranty.local -> <server-ip>
```

Then update `k8s/ingress.yaml`.

```yaml
rules:
- host: warranty.local
```

For quick testing on one workstation, add an entry to that workstation's hosts file:

```text
<server-ip> warranty.local
```

On macOS or Linux this is:

```bash
sudo nano /etc/hosts
```

On Windows this is:

```text
C:\Windows\System32\drivers\etc\hosts
```

## 7. Deploy the App

Apply the Kubernetes manifests from the repository root.

```bash
kubectl apply -k k8s/
```

Check the rollout.

```bash
kubectl rollout status deployment/warranty-claim-tracker -n warranty-claim-tracker
```

Check all resources.

```bash
kubectl get all -n warranty-claim-tracker
kubectl get ingress -n warranty-claim-tracker
```

View logs.

```bash
kubectl logs -n warranty-claim-tracker -l app=warranty-claim-tracker --tail=100
```

## 8. Test the Deployment

From the server:

```bash
curl -I http://localhost
```

From another machine on the same network:

```bash
curl -I http://<server-ip>
```

Or, if using local DNS:

```bash
curl -I http://warranty.local
```

Then open the app in a browser:

```text
http://<server-ip>/
```

or:

```text
http://warranty.local/
```

## 9. Optional HTTPS for Local Server

For a private LAN app, HTTP may be enough. If you need HTTPS, use one of these approaches:

- Use a real internal domain and issue certificates with an internal CA.
- Use `cert-manager` with a DNS challenge if your DNS provider supports it.
- Put a reverse proxy with a trusted certificate in front of the server.

For local-only self-signed TLS, browser trust setup is manual on every client machine, so it is usually less convenient than plain HTTP for internal tools.

## 10. Updating the App

Pull the latest code.

```bash
git pull
```

Build and import the new image.

```bash
docker build -t warranty-claim-tracker:local .
docker save warranty-claim-tracker:local | sudo k3s ctr images import -
```

Restart the deployment so K3s uses the refreshed local image.

```bash
kubectl rollout restart deployment/warranty-claim-tracker -n warranty-claim-tracker
kubectl rollout status deployment/warranty-claim-tracker -n warranty-claim-tracker
```

## 11. Scaling

The deployment currently runs two replicas:

```yaml
replicas: 2
```

For a single local server, two replicas are fine for rolling updates, but they do not protect against server failure. To change the count:

```bash
kubectl scale deployment warranty-claim-tracker -n warranty-claim-tracker --replicas=1
```

or:

```bash
kubectl scale deployment warranty-claim-tracker -n warranty-claim-tracker --replicas=3
```

## 12. Cleanup

Remove the app resources.

```bash
kubectl delete -k k8s/
```

Or remove the whole namespace.

```bash
kubectl delete namespace warranty-claim-tracker
```

Uninstall K3s from the server if you no longer need Kubernetes.

```bash
sudo /usr/local/bin/k3s-uninstall.sh
```

## Troubleshooting

Pods are not starting:

```bash
kubectl describe pod -n warranty-claim-tracker <pod-name>
kubectl logs -n warranty-claim-tracker <pod-name>
```

Image pull errors:

- Confirm `k8s/deployment.yaml` uses `image: warranty-claim-tracker:local`.
- Confirm `imagePullPolicy: IfNotPresent`.
- Confirm the image was imported into K3s:

```bash
sudo k3s ctr images list | grep warranty-claim-tracker
```

Ingress does not work:

```bash
kubectl get ingressclass
kubectl describe ingress warranty-claim-tracker -n warranty-claim-tracker
```

Confirm `ingressClassName` is `traefik` when using default K3s.

App returns 404 or assets fail to load:

- Confirm `base-path` in `k8s/configmap.yaml`.
- Confirm the URL path matches the configured base path.
- Restart the deployment after changing runtime configuration:

```bash
kubectl rollout restart deployment/warranty-claim-tracker -n warranty-claim-tracker
```

Port `80` is not reachable:

- Confirm the server firewall allows HTTP:

```bash
sudo ufw allow 80/tcp
sudo ufw status
```

- Confirm the server and client are on the same network.
- Confirm the server IP address has not changed.
