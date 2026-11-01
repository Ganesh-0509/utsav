# Deployment Guide

Utsav is architected for zero-configuration cloud deployment on **Vercel**, containerized deployment on **Google Cloud Run**, or standalone Node.js environments.

## 1. Production Deployment on Vercel (Current Live Deployment)

- **Production URL**: `https://utsav1.vercel.app/`
- **Framework Preset**: Next.js
- **Node.js Runtime**: `>= 22`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Environment Variables

| Variable              | Requirement | Description                                                                                                                                        |
| :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`      | Recommended | Google AI Studio API key for live Gemini 2.5 generative calls. If omitted, Utsav gracefully falls back to deterministic curated Indian blueprints. |
| `FIREBASE_PROJECT_ID` | Optional    | Google Firebase Project ID for multi-device family synchronization.                                                                                |
| `NEXT_PUBLIC_APP_URL` | Optional    | Canonical URL of the production deployment.                                                                                                        |

## 2. Docker & Containerized Deployment (Google Cloud Run)

The repository includes a production-optimized multi-stage [`Dockerfile`](../Dockerfile) utilizing Next.js Standalone mode.

```bash
# 1. Build production container
docker build -t utsav:latest .

# 2. Run container locally
docker run -p 3000:3000 -e GEMINI_API_KEY="your-key" utsav:latest

# 3. Deploy to Google Cloud Run
gcloud run deploy utsav \
  --image gcr.io/PROJECT_ID/utsav:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

## 3. Post-Deployment Verification Checklist

```bash
# Verify HTTP 200 and strict security headers
curl -sI https://utsav1.vercel.app/

# Verify health check endpoint
curl -s https://utsav1.vercel.app/api/health
# Response: {"status":"healthy"}

# Verify CSP header with nonce and no unsafe-inline
curl -sI https://utsav1.vercel.app/ | grep -i "content-security-policy"
```
