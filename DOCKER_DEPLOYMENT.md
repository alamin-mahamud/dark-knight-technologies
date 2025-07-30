# Dark Knight Technologies - Docker Deployment Guide

## 🚀 Quick Start

### Production Deployment

```bash
# Clone the repository
git clone <repository-url>
cd dark-knight-technologies

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Development Deployment

```bash
# Start development environment with live reload
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

## 📋 Services Overview

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| `frontend` | 3000 | Next.js application |
| `backend` | 8000 | FastAPI application |
| `postgres` | 5432 | PostgreSQL database |
| `nginx` | 80/443 | Reverse proxy (production) |

### Architecture

```
                    ┌─────────────┐
                    │   Nginx     │ :80/:443
                    │  (Production)│
                    └─────┬───────┘
                          │
                    ┌─────▼───────┐
                    │  Frontend   │ :3000
                    │  (Next.js)  │
                    └─────┬───────┘
                          │
                    ┌─────▼───────┐
                    │   Backend   │ :8000
                    │  (FastAPI)  │
                    └─────┬───────┘
                          │
                    ┌─────▼───────┐
                    │ PostgreSQL  │ :5432
                    │  Database   │
                    └─────────────┘
```

## 🛠️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/dark_knight_technologies
POSTGRES_PASSWORD=your-secure-password

# Backend
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
SECRET_KEY=your-secret-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### SSL/HTTPS Setup (Production)

1. Add SSL certificates to `./certs/` directory
2. Update `nginx.conf` with SSL configuration
3. Use the production profile:

```bash
docker-compose --profile production up -d
```

## 🔧 Development

### Live Reload Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Install frontend dependencies (if needed)
docker-compose -f docker-compose.dev.yml exec frontend-dev npm install

# Install backend dependencies (if needed)
docker-compose -f docker-compose.dev.yml exec backend-dev pip install -r requirements.txt

# Run database migrations
docker-compose -f docker-compose.dev.yml exec backend-dev python -m alembic upgrade head
```

### Debugging

```bash
# View service logs
docker-compose logs -f [service-name]

# Execute commands in containers
docker-compose exec backend bash
docker-compose exec frontend sh

# Database access
docker-compose exec postgres psql -U postgres -d dark_knight_technologies
```

## 🚀 Production Deployment

### Prerequisites

- Docker & Docker Compose installed
- Domain name configured (if using nginx)
- SSL certificates (if using HTTPS)

### Deployment Steps

1. **Prepare Environment**
   ```bash
   cp .env.example .env
   # Configure production values in .env
   ```

2. **Build and Deploy**
   ```bash
   docker-compose up -d --build
   ```

3. **Initialize Database**
   ```bash
   docker-compose exec backend python -m alembic upgrade head
   ```

4. **Verify Deployment**
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:3000
   ```

### Production Optimizations

- **Resource Limits**: Configure memory and CPU limits
- **Scaling**: Use `docker-compose up --scale frontend=3`
- **Monitoring**: Add health checks and monitoring
- **Backups**: Set up automated database backups

## 🔐 Security

### Production Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting in nginx
- [ ] Regular security updates
- [ ] Monitor logs for suspicious activity

### Network Security

```bash
# Create custom network
docker network create dark-knight-secure --driver bridge

# Update docker-compose.yml to use custom network
```

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Check service health
docker-compose ps

# Backend health
curl http://localhost:8000/health

# Frontend health
curl http://localhost:3000

# Database health
docker-compose exec postgres pg_isready -U postgres
```

### Log Management

```bash
# View logs
docker-compose logs -f --tail=100

# Log rotation (add to docker-compose.yml)
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### Database Backup

```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres dark_knight_technologies > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U postgres -d dark_knight_technologies < backup.sql
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using ports
   lsof -i :3000
   lsof -i :8000
   lsof -i :5432
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Test connection
   docker-compose exec backend python -c "from app.database import engine; engine.connect()"
   ```

3. **Frontend Build Issues**
   ```bash
   # Clear Next.js cache
   docker-compose exec frontend rm -rf .next
   
   # Rebuild frontend
   docker-compose up --build frontend
   ```

4. **Memory Issues**
   ```bash
   # Check container resource usage
   docker stats
   
   # Increase Docker memory limit
   # Docker Desktop > Settings > Resources > Memory
   ```

### Performance Optimization

```bash
# Remove unused images and containers
docker system prune -a

# Monitor resource usage
docker stats

# Optimize images
docker-compose build --no-cache
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale frontend instances
docker-compose up --scale frontend=3

# Scale with load balancer
docker-compose --profile production up --scale frontend=3
```

### Production Load Balancing

Update `nginx.conf` for multiple frontend instances:

```nginx
upstream frontend {
    server frontend_1:3000;
    server frontend_2:3000;
    server frontend_3:3000;
}
```

---

## 🆘 Support

For issues and questions:
1. Check the logs: `docker-compose logs -f`
2. Verify environment configuration
3. Ensure all required ports are available
4. Check Docker and Docker Compose versions

**Minimum Requirements:**
- Docker: 20.10+
- Docker Compose: 2.0+
- Memory: 4GB RAM
- Storage: 10GB available space