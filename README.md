# CI/CD Pipeline for a Web Application

A Node.js/Express app delivered through a fully automated pipeline.

## Architecture

```
Developer ──push/PR──▶ GitHub ──▶ GitHub Actions
                                   │
   ┌───────────────────────────────┘
   ▼
 [1 Test]  lint (ESLint) → unit tests (Jest) → dependency audit
   ▼
 [2 Build] Docker multi-stage build → Trivy vuln scan → push to GHCR (tag = git SHA)
   ▼
 [3 Staging]    kubectl apply → rollout status → smoke test (/health)
   ▼  (manual approval via GitHub Environment)
 [4 Production] rolling update (zero downtime) → auto-rollback on failure
```

## Tools
| Stage | Tool |
|---|---|
| Source control | Git + GitHub |
| CI/CD orchestration | GitHub Actions |
| Lint / test / audit | ESLint, Jest + Supertest, npm audit |
| Containerization | Docker (multi-stage, non-root) |
| Registry | GitHub Container Registry (GHCR) |
| Security scanning | Trivy |
| Orchestration | Kubernetes (Deployment, Service, probes) |

## Run locally
```bash
npm install
npm test
docker compose up --build      # http://localhost:3000
```

## Set up the pipeline
1. Push this repo to GitHub (branch `main`).
2. Create a Kubernetes cluster (minikube / kind / EKS / GKE / AKS).
3. Add secret `KUBE_CONFIG_B64`: `base64 -w0 ~/.kube/config`
4. Settings → Environments: create `staging` and `production`; on `production` add *Required reviewers*.
5. If the GHCR package is private, create an `imagePullSecret` in each namespace (or make the package public).
6. Push to `main` and watch the Actions tab.

## Branch flow
- **Pull request** → test + build + scan only (nothing is pushed or deployed).
- **Merge to main** → full pipeline; production waits for approval.

## Possible extensions
SonarCloud code quality gate, Terraform for cluster provisioning, Helm/Argo CD for GitOps, Prometheus + Grafana monitoring, Slack notifications.
