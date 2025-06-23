# 🐳 Docker & Docker Compose Guide

## 📋 **วิธีการใช้งาน Docker**

### 🚀 **Development Environment**

```bash
# รัน development environment พร้อม hot reload
npm run docker:dev

# ดู logs ของ development environment
docker-compose -f docker-compose.dev.yml logs -f

# หยุด development environment
docker-compose -f docker-compose.dev.yml down
```

### 🏭 **Production Environment**

```bash
# รัน production environment
npm run docker:prod

# ดู logs ของ production environment
npm run docker:logs

# หยุด production environment
npm run docker:stop

# ลบ containers, volumes และ images
npm run docker:clean
```

### 🔧 **Single Container Commands**

```bash
# Build Docker image
npm run docker:build

# Run single container
npm run docker:run

# เข้าถึงฐานข้อมูลใน container
npm run docker:db
```

## 📁 **File Structure**

```
SampleFastify/
├── 🐳 Dockerfile                    # Production Dockerfile
├── 🐳 Dockerfile.dev                # Development Dockerfile
├── 🐳 docker-compose.yml            # Production Docker Compose
├── 🐳 docker-compose.dev.yml        # Development Docker Compose
├── 🚫 .dockerignore                 # Docker ignore file
├── ⚙️ .env.docker                   # Docker environment variables
├── 🔨 build.js                      # Manual build script
│
├── 🌐 nginx/
│   ├── nginx.conf                   # Nginx configuration
│   └── ssl/                         # SSL certificates directory
│
└── 📝 logs/                         # Logs directory for containers
```

## 🌐 **Services Overview**

### **PostgreSQL Database**
- **Port**: 5432
- **Database**: fastify_app
- **User**: postgres
- **Password**: postgres123

### **Redis Cache**
- **Port**: 6379
- **Use**: Caching and session storage

### **Fastify Application**
- **Port**: 3000
- **Environment**: Production/Development
- **Health Check**: `/health`

### **Nginx Reverse Proxy**
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Features**: Rate limiting, compression, security headers

## 🔧 **Environment Variables**

### **Production (.env.docker)**
```env
NODE_ENV=production
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=fastify_app
DB_USER=postgres
DB_PASSWORD=postgres123
JWT_SECRET=your-super-secret-jwt-key
REDIS_HOST=redis
REDIS_PORT=6379
```

### **Development**
```env
NODE_ENV=development
PORT=3000
DB_NAME=fastify_app_dev
# ... other variables
```

## 🏥 **Health Checks**

### **Application Health**
```bash
curl http://localhost:3000/health
```

### **Database Health**
```bash
docker-compose exec postgres pg_isready -U postgres
```

### **Redis Health**
```bash
docker-compose exec redis redis-cli ping
```

## 📊 **Monitoring & Logs**

### **View Application Logs**
```bash
npm run docker:logs
```

### **View Individual Service Logs**
```bash
# Application logs
docker-compose logs -f fastify_app

# Database logs
docker-compose logs -f postgres

# Nginx logs
docker-compose logs -f nginx
```

### **Access Logs Location**
- **Application**: `./logs/app.log`
- **Nginx**: `./logs/nginx/`

## 🛡️ **Security Features**

### **Container Security**
- ✅ Non-root user execution
- ✅ Multi-stage builds
- ✅ Minimal Alpine images
- ✅ Security headers via Nginx

### **Network Security**
- ✅ Internal Docker networks
- ✅ Rate limiting via Nginx
- ✅ CORS policy
- ✅ SSL/TLS support

### **Data Security**
- ✅ Persistent volumes for data
- ✅ Environment variable isolation
- ✅ Secrets management

## 🚀 **Deployment Options**

### **Local Development**
```bash
npm run docker:dev
```

### **Production Deployment**
```bash
npm run docker:prod
```

### **Cloud Deployment**
1. **Push to Docker Registry**
```bash
docker tag samplefastify:latest your-registry/samplefastify:latest
docker push your-registry/samplefastify:latest
```

2. **Deploy to Cloud Platform**
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🔄 **Scaling**

### **Horizontal Scaling**
```yaml
# In docker-compose.yml
fastify_app:
  deploy:
    replicas: 3
```

### **Load Balancing**
- Nginx handles load balancing
- Add more upstream servers in nginx.conf

## 📝 **Troubleshooting**

### **Common Issues**

1. **Port Already in Use**
```bash
# Check what's using the port
netstat -tulpn | grep :3000

# Change port in .env.docker
PORT=3001
```

2. **Database Connection Failed**
```bash
# Check if PostgreSQL is running
docker-compose ps
docker-compose logs postgres
```

3. **Permission Denied**
```bash
# Fix file permissions
chmod +x scripts/*
```

### **Cleanup Commands**
```bash
# Remove all containers
docker container prune

# Remove all images
docker image prune -a

# Remove all volumes
docker volume prune

# Complete cleanup
docker system prune -a --volumes
```

## 📖 **API Endpoints**

### **Application URLs**
- **API**: http://localhost:3000
- **Documentation**: http://localhost:3000/docs
- **Health Check**: http://localhost:3000/health

### **Through Nginx**
- **API**: http://localhost
- **Documentation**: http://localhost/docs
- **Health Check**: http://localhost/health

---

## 🎉 **Quick Start**

1. **Clone และเข้า directory**
2. **Copy environment file**: `cp .env.example .env.docker`
3. **Run development**: `npm run docker:dev`
4. **Access API**: http://localhost:3000

**Happy Dockerizing! 🐳**
