# Kubernetes Deployment Guide

This guide explains how to deploy the Warranty Claim Tracker application to Kubernetes.

## Prerequisites

- Kubernetes cluster (1.19+)
- Docker registry (for pushing container images)
- `kubectl` CLI configured to access your cluster
- `kustomize` or `kubectl` with kustomize support (built-in from 1.14+)

## Build and Push Docker Image

```bash
# Build the Docker image
docker build -t your-registry/warranty-claim-tracker:latest .

# Push to your container registry
docker push your-registry/warranty-claim-tracker:latest
```

## Update Image Reference

Edit `k8s/deployment.yaml` and update the image field:

```yaml
image: your-registry/warranty-claim-tracker:latest
```

## Deploy to Kubernetes

### Option 1: Using Kustomize

```bash
# Apply all manifests using kustomize
kubectl apply -k k8s/

# Verify deployment
kubectl get all -n warranty-claim-tracker
kubectl logs -n warranty-claim-tracker -l app=warranty-claim-tracker
```

### Option 2: Apply Individual Manifests

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply configuration
kubectl apply -f k8s/configmap.yaml

# Deploy application
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## Verify Deployment

```bash
# Check deployment status
kubectl get deployment -n warranty-claim-tracker

# Check pods
kubectl get pods -n warranty-claim-tracker

# Check service
kubectl get service -n warranty-claim-tracker

# View logs
kubectl logs -n warranty-claim-tracker -l app=warranty-claim-tracker -f

# Port forward for testing
kubectl port-forward -n warranty-claim-tracker svc/warranty-claim-tracker 3000:80
```

## Access the Application

Once deployed, the application will be accessible at:
- `http://{cluster-ip-or-ingress-host}/Warranty-Claim-Tracker`

For testing locally:
```bash
# Option 1: Port forward to service (recommended)
kubectl port-forward -n warranty-claim-tracker svc/warranty-claim-tracker 3000:80

# Option 2: Port forward directly to a pod
kubectl port-forward -n warranty-claim-tracker <pod-name> 3000:3000

# Visit http://localhost:3000/Warranty-Claim-Tracker
```

## Scaling

```bash
# Scale the deployment to 3 replicas
kubectl scale deployment warranty-claim-tracker -n warranty-claim-tracker --replicas=3

# Or edit the deployment directly
kubectl edit deployment warranty-claim-tracker -n warranty-claim-tracker
```

## Update Deployment

```bash
# After pushing a new image, trigger a rollout
kubectl rollout restart deployment/warranty-claim-tracker -n warranty-claim-tracker

# Monitor the rollout
kubectl rollout status deployment/warranty-claim-tracker -n warranty-claim-tracker
```

## Cleanup

```bash
# Remove all resources
kubectl delete -k k8s/

# Or remove namespace (which deletes all resources within it)
kubectl delete namespace warranty-claim-tracker
```

## Environment Variables

Edit `k8s/configmap.yaml` to modify:
- `NEXT_PUBLIC_BASE_PATH`: Base path for the application (default: `/Warranty-Claim-Tracker`)

For sensitive data like API keys, use Kubernetes Secrets instead of ConfigMap.

## Troubleshooting

```bash
# Check pod status
kubectl describe pod -n warranty-claim-tracker <pod-name>

# View events
kubectl get events -n warranty-claim-tracker

# Check resource limits
kubectl top nodes
kubectl top pods -n warranty-claim-tracker
```
