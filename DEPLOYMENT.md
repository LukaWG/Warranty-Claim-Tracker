# Warranty Claim Tracker - Kubernetes Deployment Guide

This project has been successfully converted from Vite/React Router to **Next.js** with **Kubernetes deployment** support.

## Changes Made

### Build Tool Migration: Vite → Next.js

- ✅ Converted from Vite to Next.js 14
- ✅ Replaced React Router with Next.js App Router
- ✅ Updated all route imports (`useRouter`, `useNavigate`, `Link`) to Next.js equivalents
- ✅ Created Next.js page structure (`_app.jsx`, `pages/`)
- ✅ Configured `next.config.js` for `/Warranty-Claim-Tracker` base path

### Deployment: Kubernetes

- ✅ Created `Dockerfile` for containerization
- ✅ Added Kubernetes manifests in `k8s/` directory
- ✅ Set up GitHub Actions workflow for automated Docker builds
- ✅ Configured health checks, resource limits, and rolling updates

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000/Warranty-Claim-Tracker
```

### Build & Test Locally

```bash
# Build for production
npm run build

# Start production server
npm start

# Visit http://localhost:3000/Warranty-Claim-Tracker
```

### Docker Build & Run

```bash
# Build Docker image
docker build -t warranty-claim-tracker:latest .

# Run container
docker run -p 3000:3000 warranty-claim-tracker:latest

# Visit http://localhost:3000/Warranty-Claim-Tracker
```

## Kubernetes Deployment

See [k8s/README.md](./k8s/README.md) for detailed deployment instructions.

### Quick Deploy

```bash
# Apply all Kubernetes resources
kubectl apply -k k8s/

# Verify deployment
kubectl get all -n warranty-claim-tracker
```

### Port Forward for Testing

```bash
kubectl port-forward -n warranty-claim-tracker svc/warranty-claim-tracker 3000:80
# Visit http://localhost:3000/Warranty-Claim-Tracker
```

## GitHub Actions Workflow

The `.github/workflows/k8s-deploy.yml` workflow:
1. Builds and pushes Docker image to GitHub Container Registry
2. Deploys to Kubernetes on successful build (for `main` branch)
3. Monitors rollout status

**Setup Required:**
- Add `KUBE_CONFIG` secret to GitHub repository (base64-encoded kubeconfig)
- Update `k8s/deployment.yaml` image reference if using different registry

## Project Structure

```
├── src/
│   ├── pages/           # Next.js pages
│   │   ├── _app.jsx     # Global app wrapper
│   │   ├── index.jsx    # Home redirect
│   │   ├── 404.jsx      # 404 page
│   │   └── *.jsx        # Route pages
│   ├── components/      # React components
│   ├── lib/             # Libraries and utilities
│   └── api/             # API clients
├── public/              # Static assets
├── k8s/                 # Kubernetes manifests
├── Dockerfile           # Container image definition
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies
```

## Important Notes

- All routes use `/Warranty-Claim-Tracker` base path (configurable via `NEXT_PUBLIC_BASE_PATH`)
- React Router imports have been replaced with Next.js routing
- Static export is disabled for server-side rendering in Kubernetes
- The app runs on port 3000 by default

## Environment Variables

- `NEXT_PUBLIC_BASE_PATH`: Base path for the application (default: `/Warranty-Claim-Tracker`)
- `NODE_ENV`: Set to `production` in Kubernetes deployments
- `PORT`: Server port (default: 3000)

## Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed: `node --version`
- Clear cache: `rm -rf .next node_modules && npm install`

### Runtime Issues
- Check logs: `npm run build && npm start`
- Verify environment variables in `next.config.js`

### Kubernetes Issues
- See [k8s/README.md](./k8s/README.md) troubleshooting section
- Check pod logs: `kubectl logs -n warranty-claim-tracker <pod-name>`

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [Docker Documentation](https://docs.docker.com)
