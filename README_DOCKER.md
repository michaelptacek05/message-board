# 🐳 Docker Setup - Message Board

## 🚀 Local Development

```bash
docker compose up --build
```

Ready on:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: localhost:5432

Uses `docker-compose.yml` (local build)

---

## 📦 Build & Push to Registry

### Step 1: Build images locally

```bash
cd backend && npm run docker:build
cd ../frontend && npm run docker:build
```

### Step 2: Push to GHCR

```bash
# Must authenticate first
docker login ghcr.io

# From backend/
npm run docker:build
docker push ghcr.io/michaelptacek05/message-board-backend

# From frontend/
npm run docker:build
docker push ghcr.io/michaelptacek05/message-board-frontend
```

---

## 🎯 Deploy to Portainer

**Use `docker-compose.prod.yml`** - pulls images from GHCR

1. SSH to server:
```bash
cd /home/message-board
cp docker-compose.prod.yml docker-compose.yml
```

2. Create `.env`:
```
POSTGRES_PASSWORD=super-secret
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_SOCKET_URL=https://your-domain.com
```

3. Start:
```bash
docker compose up -d
```

Or in Portainer UI:
- **Stacks** → **Add stack** 
- Paste `docker-compose.prod.yml` content
- **Deploy**

---

## 🛑 Stop & Cleanup

```bash
docker compose down

# Also remove volumes (⚠️ deletes data)
docker compose down -v
```
