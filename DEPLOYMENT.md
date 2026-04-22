# 🚀 Deployment na Contabo VPS s Portainer

## PŘÍPRAVA

### Krok 1: Připrav server

Na VPS spusť (SSH):
```bash
# Aktualizace systému
sudo apt update && sudo apt upgrade -y

# Instalace Dockeru (pokud ještě není)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalace Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalace Portaineru
docker run -d -p 8000:8000 -p 9000:9000 \
  --name=portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

### Krok 2: Přístup k Portaineru

- Otevři v prohlížeči: `https://tvuj-vps-ip:9000`
- Vytvoř admin účet
- Přihlaš se

---

## NASAZENÍ PROJEKTU

### Krok 3: Upload souboru docker-compose.yml

#### Možnost A: Přes SSH na server

```bash
# Na lokálním počítači - zkopíruj docker-compose.yml na server
scp docker-compose.yml root@tvuj-vps-ip:/home/message-board/

# SSH do serveru
ssh root@tvuj-vps-ip
cd /home/message-board

# Vytvoř .env soubor
nano .env
```

Vlož to:
```
DB_USER=postgres
DB_PASSWORD=tvoje_super_bezpecna_hesla_123!
DB_NAME=message_board
BACKEND_URL=https://api.example.com (tvoje doména nebo IP)
```

Ulož: `Ctrl+O` → Enter → `Ctrl+X`

#### Možnost B: Přes Portainer UI (jednodušší)

1. Jdi do Portainer → **Stacks** (levý panel)
2. Klikni **+ Add stack**
3. Vyber **Web editor**
4. Vlož obsah `docker-compose.yml` (viz výše)
5. Scrolluj dolů → **Stack name**: `message-board`
6. Klikni **Deploy the stack**

---

## ŘEŠENÍ PROBLÉMŮ

### Health checks se nedaří

Přidej curl do Docker image:
```dockerfile
RUN apk add --no-cache curl
```

### Backend se nemůže připojit k databázi

Zkontroluj v Portainer → **Containers**:
- Je `postgres` container spuštěný?
- Odpovídá heslo v `DATABASE_URL`?

Debug příkaz (SSH na server):
```bash
docker exec message-board-backend \
  psql postgresql://postgres:password@postgres:5432/message_board \
  -c "SELECT 1"
```

### Frontend nevidí backend

Zkontroluj `NEXT_PUBLIC_API_URL` v `.env`:
```bash
# Na serveru
docker exec message-board-frontend env | grep NEXT_PUBLIC
```

### Chceš smazat všechno a začít znovu

```bash
# Stop všech kontejnerů
docker compose -f docker-compose.yml down

# Smazání volumes (DATA ZTRÁTA!)
docker compose -f docker-compose.yml down -v

# Rebuild images
docker compose -f docker-compose.yml build --no-cache

# Start znovu
docker compose -f docker-compose.yml up -d
```

---

## MONITORING V PORTAINERU

1. **Containers**: Vidíš stav všech kontejnerů
2. **Logs**: Klinkni na kontejner → **Logs** tab pro debug
3. **Stats**: Real-time CPU/Memory/Network

---

## BACKUP DATABÁZE

```bash
# Na serveru
docker exec message-board-db pg_dump -U postgres message_board > backup.sql

# Download backup
scp root@tvuj-vps-ip:/path/to/backup.sql ./backup.sql
```

---

## HTTPS (SSL/TLS)

Doporučuji Nginx Reverse Proxy s Let's Encrypt:

```bash
docker run -d -p 80:80 -p 443:443 \
  --name nginx-proxy \
  --restart always \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  -v nginx_certs:/etc/nginx/certs \
  -v nginx_conf:/etc/nginx/conf.d \
  jwilder/nginx-proxy:latest
```

---

## PRODUCTION CHECKLIST

- [ ] .env soubor má bezpečná hesla
- [ ] DATABASE_URL používá contrainername (`postgres`) místo IP
- [ ] NEXT_PUBLIC_API_URL je správná (doména nebo IP)
- [ ] Health checks projdou (Portainer → Health)
- [ ] Logs vypadají OK (docker logs message-board-backend)
- [ ] Firewall povoluje port 3000 a 3001
- [ ] Backupy databáze jsou funkční

Done! 🎉
