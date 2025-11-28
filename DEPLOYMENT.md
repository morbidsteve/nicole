# Purely Planned Consulting - Deployment Guide

This guide will help you deploy your website to a VPS using Docker.

## Prerequisites

Your VPS needs:
- Docker installed
- Docker Compose installed
- Git installed
- A domain name pointed to your VPS IP address (optional but recommended)

## Quick Start (5 Minutes)

### 1. SSH into Your VPS

```bash
ssh your-username@your-vps-ip
```

### 2. Install Docker (if not already installed)

```bash
# Update package list
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add your user to docker group (optional, avoids using sudo)
sudo usermod -aG docker $USER
```

Log out and back in for group changes to take effect.

### 3. Clone Your Repository

```bash
git clone https://github.com/morbidsteve/nicole.git
cd nicole
git checkout claude/lifestyle-management-site-011VRbjA2Ah1X4zBmxwcXkyR
```

### 4. Deploy the Website

```bash
# Build and start the container
docker-compose up -d

# Verify it's running
docker-compose ps
```

Your website is now live at `http://your-vps-ip`

## Custom Port Deployment

If you want to run on a different port (e.g., 8080 instead of 80):

1. Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 80 to your desired port
```

2. Restart:
```bash
docker-compose down
docker-compose up -d
```

## SSL/HTTPS Setup (Recommended for Production)

### Option 1: Using Caddy (Easiest - Automatic SSL)

Create `Caddyfile`:
```
yourdomain.com {
    reverse_proxy localhost:80
}
```

Run Caddy:
```bash
docker run -d -p 80:80 -p 443:443 \
  -v $PWD/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  caddy:alpine
```

### Option 2: Using Nginx Proxy Manager (GUI)

1. Install Nginx Proxy Manager:
```bash
docker run -d \
  --name nginx-proxy-manager \
  -p 80:80 \
  -p 81:81 \
  -p 443:443 \
  jc21/nginx-proxy-manager:latest
```

2. Access GUI at `http://your-vps-ip:81`
3. Default login: `admin@example.com` / `changeme`
4. Add proxy host pointing to your container

### Option 3: Using Certbot (Manual SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## Useful Commands

### View Logs
```bash
docker-compose logs -f
```

### Stop the Website
```bash
docker-compose down
```

### Restart the Website
```bash
docker-compose restart
```

### Update the Website
```bash
# Pull latest changes
git pull origin claude/lifestyle-management-site-011VRbjA2Ah1X4zBmxwcXkyR

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Check Container Status
```bash
docker-compose ps
docker-compose logs web
```

### Remove Everything (Clean Slate)
```bash
docker-compose down
docker system prune -a
```

## Firewall Configuration

If using UFW (Ubuntu Firewall):

```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow SSH (important!)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## Production Checklist

- [ ] Domain name configured and DNS pointing to VPS IP
- [ ] SSL/HTTPS enabled (use Caddy or Nginx Proxy Manager)
- [ ] Firewall configured (ports 80, 443, 22)
- [ ] Container set to restart automatically (`restart: unless-stopped`)
- [ ] Regular backups configured
- [ ] Monitoring set up (optional: UptimeRobot, Pingdom)

## Troubleshooting

### Port 80 Already in Use
```bash
# Check what's using port 80
sudo lsof -i :80

# Stop Apache if installed
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Website Not Accessible
```bash
# Check if container is running
docker-compose ps

# Check nginx logs
docker-compose logs web

# Verify firewall
sudo ufw status
```

## Performance Tips

1. **Enable CDN**: Use Cloudflare (free) for better performance and DDoS protection
2. **Image Optimization**: Compress images before uploading
3. **Monitoring**: Set up uptime monitoring with UptimeRobot (free)
4. **Backups**: Schedule automatic backups of your VPS

## Cost Estimate

**Recommended VPS Providers:**
- **DigitalOcean**: $6/month (1GB RAM, 25GB SSD)
- **Linode**: $5/month (1GB RAM, 25GB SSD)
- **Vultr**: $5/month (1GB RAM, 25GB SSD)
- **Hetzner**: €4.51/month (~$5) (2GB RAM, 40GB SSD) - Best value!

Any of these can easily handle 10,000+ monthly visitors.

## Support

For issues:
1. Check logs: `docker-compose logs`
2. Restart: `docker-compose restart`
3. Rebuild: `docker-compose up -d --build`

---

**Your website is now containerized and ready for professional deployment!** 🚀
