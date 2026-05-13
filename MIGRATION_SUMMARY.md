# Migration Summary: Vite → Next.js + Kubernetes

## ✅ Completed Migrations

### Code Changes
- [x] Replaced Vite build config with Next.js 14
- [x] Converted React Router to Next.js routing:
  - `useNavigate()` → `useRouter()` from `next/router`
  - `<Link to={}>` → `<Link href={}>`  (from `next/link`)
  - `<BrowserRouter>` removed (built-in to Next.js)
  - `useLocation()` → `router.asPath` from `useRouter()`
- [x] Created Next.js page structure:
  - `src/pages/_app.jsx` - Global wrapper with providers
  - `src/pages/index.jsx` - Home redirect
  - `src/pages/[...page].jsx` - Dynamic catch-all router
  - `src/pages/404.jsx` - Custom 404 page
- [x] Updated route utility: `createPageUrl()` to work with Next.js
- [x] Removed React Router dependency from package.json

### Build Configuration
- [x] Created `next.config.js` with:
  - `output: 'standalone'` for Docker containerization
  - `basePath: '/Warranty-Claim-Tracker'` for routing under subpath
  - ESLint configuration
- [x] Updated `package.json` scripts:
  - `dev` → `next dev`
  - `build` → `next build`
  - `start` → `next start`

### Containerization
- [x] Created `Dockerfile` with multi-stage build:
  - Base image: Node 20 Alpine
  - Dependency caching layer
  - Next.js build layer
  - Minimal production image
- [x] Created `.dockerignore` for efficient builds

### Kubernetes Deployment
- [x] `k8s/namespace.yaml` - Namespace definition
- [x] `k8s/deployment.yaml` - Deployment with:
  - 2 replicas (configurable)
  - Health checks (liveness & readiness probes)
  - Resource requests/limits
  - Rolling update strategy
- [x] `k8s/service.yaml` - ClusterIP service
- [x] `k8s/configmap.yaml` - Configuration management
- [x] `k8s/ingress.yaml` - Nginx ingress routing
- [x] `k8s/kustomization.yaml` - Kustomize orchestration

### CI/CD
- [x] `.github/workflows/k8s-deploy.yml`:
  - Docker image build and push
  - Automatic deployment to Kubernetes (main branch)
  - Health check verification

### Documentation
- [x] `DEPLOYMENT.md` - Main deployment guide
- [x] `k8s/README.md` - Kubernetes-specific instructions
- [x] This migration summary

## 🚀 Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Locally
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### 3. Build Docker Image
```bash
docker build -t warranty-claim-tracker:latest .
docker run -p 3000:3000 warranty-claim-tracker:latest
```

### 4. Deploy to Kubernetes

#### Option A: Manual Deployment
```bash
kubectl apply -k k8s/
```

#### Option B: GitHub Actions Automated
1. Add `KUBE_CONFIG` secret to GitHub repository (base64-encoded)
2. Push to `main` branch
3. GitHub Actions automatically builds and deploys

### 5. Configure for Production
Update in `k8s/deployment.yaml`:
- `image:` - Your container registry image
- `replicas:` - Number of pod replicas
- Resource limits in `resources:` section

## 📋 Files Changed/Created

### Modified
- `package.json` - Updated scripts and removed React Router
- `src/pages/ClaimForm.jsx` - useNavigate → useRouter
- `src/pages/Home.jsx` - useNavigate → useRouter
- `src/pages/ChangeUser.jsx` - Link with to= → Link with href=
- `src/components/layout/SearchModal.jsx` - useNavigate → useRouter
- `src/lib/NavigationTracker.jsx` - useLocation → useRouter
- `src/lib/PageNotFound.jsx` - useLocation → useRouter
- `src/Layout.jsx` - Link from react-router-dom → next/link
- `src/utils/index.ts` - createPageUrl() refactored

### Created
- `next.config.js` - Next.js configuration
- `Dockerfile` - Container image definition
- `.dockerignore` - Docker build exclusions
- `src/pages/_app.jsx` - Global app wrapper
- `src/pages/index.jsx` - Home redirect
- `src/pages/404.jsx` - 404 page
- `src/pages/[...page].jsx` - Dynamic route handler
- `k8s/namespace.yaml` - Kubernetes namespace
- `k8s/deployment.yaml` - Kubernetes deployment
- `k8s/service.yaml` - Kubernetes service
- `k8s/configmap.yaml` - Configuration
- `k8s/ingress.yaml` - Ingress routing
- `k8s/kustomization.yaml` - Kustomize orchestration
- `k8s/README.md` - Kubernetes guide
- `.github/workflows/k8s-deploy.yml` - CI/CD workflow
- `DEPLOYMENT.md` - Main deployment guide

### Removed
- `vite.config.js` (replaced by next.config.js)
- `src/main.jsx` (replaced by _app.jsx)
- React Router from dependencies

## 🔧 Configuration

### Environment Variables
```
NEXT_PUBLIC_BASE_PATH=/Warranty-Claim-Tracker
NODE_ENV=production
PORT=3000
```

### Kubernetes ConfigMap
Edit `k8s/configmap.yaml` to change `base-path`

## 📊 Application Structure

```
Warranty Claim Tracker Local/
├── src/
│   ├── pages/                    # Next.js pages
│   │   ├── _app.jsx             # Global wrapper
│   │   ├── index.jsx            # Home redirect
│   │   ├── 404.jsx              # 404 page
│   │   ├── [...page].jsx        # Dynamic routes
│   │   ├── ClaimForm.jsx        # Page component
│   │   ├── Dashboard.jsx        # Page component
│   │   └── ...                  # Other pages
│   ├── components/              # React components
│   ├── lib/                     # Libraries
│   ├── api/                     # API clients
│   └── utils/                   # Utilities
├── k8s/                         # Kubernetes manifests
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   ├── ingress.yaml
│   ├── kustomization.yaml
│   └── README.md
├── .github/workflows/           # GitHub Actions
│   └── k8s-deploy.yml
├── Dockerfile                   # Container definition
├── .dockerignore                # Docker exclusions
├── next.config.js              # Next.js config
├── DEPLOYMENT.md               # Deployment guide
└── package.json                # Dependencies

```

## 🧪 Testing Checklist

- [ ] Local dev server runs: `npm run dev`
- [ ] Production build succeeds: `npm run build && npm start`
- [ ] Docker image builds: `docker build -t test:latest .`
- [ ] Docker container runs: `docker run -p 3000:3000 test:latest`
- [ ] Navigation works in browser
- [ ] All pages load correctly
- [ ] Auth flows work
- [ ] API calls work
- [ ] Kubernetes deployment succeeds: `kubectl apply -k k8s/`
- [ ] Pods start successfully
- [ ] Service is accessible

## 🆘 Troubleshooting

### Build fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for missing environment variables

### Docker build fails
- Ensure Docker daemon is running
- Check disk space: `docker system df`
- Clear Docker cache: `docker builder prune`

### Kubernetes deployment fails
- Check kubeconfig is valid
- Verify cluster access: `kubectl cluster-info`
- Check container registry access
- Review pod logs: `kubectl logs -n warranty-claim-tracker <pod>`

## 📚 References

- [Next.js Docs](https://nextjs.org/docs)
- [Next.js Routing](https://nextjs.org/docs/routing/introduction)
- [Kubernetes Docs](https://kubernetes.io/docs)
- [Docker Docs](https://docs.docker.com)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## ✨ Notes

- The application runs on port 3000
- Base path is `/Warranty-Claim-Tracker` (configurable)
- Kubernetes runs with 2 replicas (configurable)
- Health checks are configured (30s liveness, 10s readiness)
- Resource limits: 512Mi RAM / 500m CPU max
