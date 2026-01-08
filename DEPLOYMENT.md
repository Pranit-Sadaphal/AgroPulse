# Deployment Guide

This guide covers deploying AgroPulse to various cloud platforms.

## Table of Contents

- [Render](#render)
- [Railway](#railway)
- [AWS](#aws)
- [Docker Production](#docker-production)

## Render

### Backend Deployment

1. **Create a new Web Service**
   - Connect your GitHub repository
   - Select the `backend` directory as root
   - Build command:
     ```bash
     pip install -r requirements.txt && python train_model.py
     ```
   - Start command:
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - Environment variables:
     - `CORS_ORIGINS`: Your frontend URL (e.g., `https://agropulse-frontend.onrender.com`)

2. **Get your backend URL**
   - Example: `https://agropulse-backend.onrender.com`

### Frontend Deployment

1. **Create a new Static Site**
   - Connect your GitHub repository
   - Select the `frontend` directory as root
   - Build command:
     ```bash
     npm install && npm run build
     ```
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_API_URL`: Your backend URL (e.g., `https://agropulse-backend.onrender.com`)

## Railway

### Backend Deployment

1. **Create a new project**
   - Connect your GitHub repository
   - Add a new service
   - Select `backend` directory
   - Railway will auto-detect Python

2. **Configure**
   - Build command: `pip install -r requirements.txt && python train_model.py`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment variables:
     - `CORS_ORIGINS`: Your frontend URL

### Frontend Deployment

1. **Create a new service**
   - Select `frontend` directory
   - Railway will auto-detect Node.js

2. **Configure**
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist -l $PORT`
   - Environment variables:
     - `VITE_API_URL`: Your backend URL

## AWS

### Option 1: EC2 with Docker

1. **Launch EC2 instance**
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Security group: Allow ports 80, 443, 8000

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Docker**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```

4. **Clone and deploy**
   ```bash
   git clone your-repo-url
   cd AgroPulse
   # Train model first
   cd backend && python3 -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   python train_model.py
   cd ..
   # Start with Docker
   docker-compose up -d --build
   ```

### Option 2: ECS (Elastic Container Service)

1. **Build and push Docker images**
   ```bash
   # Backend
   docker build -t agropulse-backend ./backend
   docker tag agropulse-backend:latest your-ecr-repo/agropulse-backend:latest
   docker push your-ecr-repo/agropulse-backend:latest
   
   # Frontend
   docker build -t agropulse-frontend ./frontend
   docker tag agropulse-frontend:latest your-ecr-repo/agropulse-frontend:latest
   docker push your-ecr-repo/agropulse-frontend:latest
   ```

2. **Create ECS task definitions and services**
   - Use AWS Console or CLI
   - Configure load balancers
   - Set environment variables

### Option 3: S3 + CloudFront (Frontend) + EC2/ECS (Backend)

1. **Frontend to S3**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

2. **Configure CloudFront**
   - Create distribution
   - Point to S3 bucket
   - Configure CORS headers

3. **Backend on EC2/ECS**
   - Follow EC2 or ECS instructions above

## Docker Production

### Build and Run

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Optimizations

1. **Use production Dockerfile**
   - Multi-stage builds
   - Optimized layers
   - Security scanning

2. **Environment variables**
   - Use `.env` files (not committed)
   - Set `ENVIRONMENT=production`
   - Configure database URLs

3. **Reverse Proxy**
   - Use Nginx for frontend
   - Configure SSL/TLS
   - Set up load balancing

## Environment Variables

### Backend

```env
ENVIRONMENT=production
CORS_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=8000
```

### Frontend

```env
VITE_API_URL=https://your-backend-domain.com
```

## SSL/TLS Setup

### Using Let's Encrypt (Nginx)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

## Monitoring

### Health Checks

- Backend: `GET /health`
- Set up monitoring (e.g., UptimeRobot, Pingdom)

### Logging

- Use cloud logging services
- Configure log aggregation
- Set up alerts

## Troubleshooting

### Common Issues

1. **CORS errors**
   - Check `CORS_ORIGINS` environment variable
   - Ensure frontend URL is included

2. **Model not found**
   - Ensure `train_model.py` runs during build
   - Check model files are in `app/model/`

3. **Port conflicts**
   - Use environment variable `$PORT` in production
   - Configure reverse proxy

4. **Build failures**
   - Check build logs
   - Verify dependencies
   - Ensure Node.js/Python versions match

## Security Checklist

- [ ] Use HTTPS/SSL
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor logs for suspicious activity

