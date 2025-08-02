#!/bin/bash

# Deploy script for Dark Knight Technologies Frontend
set -e

# Configuration
ENVIRONMENT=${1:-staging}
IMAGE_TAG=${2:-latest}
REGISTRY="ghcr.io/dark-knight-technologies/frontend"

echo "🚀 Starting deployment to $ENVIRONMENT..."

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
    echo "❌ Invalid environment. Use 'staging' or 'production'"
    exit 1
fi

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    echo "📄 Loading environment variables from .env.$ENVIRONMENT"
    export $(cat .env.$ENVIRONMENT | xargs)
else
    echo "⚠️  No .env.$ENVIRONMENT file found, using defaults"
fi

# Health check function
health_check() {
    local url=$1
    local max_attempts=30
    local attempt=1
    
    echo "🩺 Performing health check on $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s --max-time 10 "$url/api/health" > /dev/null; then
            echo "✅ Health check passed!"
            return 0
        fi
        
        echo "⏳ Attempt $attempt/$max_attempts failed, retrying in 10s..."
        sleep 10
        ((attempt++))
    done
    
    echo "❌ Health check failed after $max_attempts attempts"
    return 1
}

# Docker deployment
deploy_docker() {
    echo "🐳 Deploying with Docker Compose..."
    
    # Pull latest images
    docker-compose pull frontend
    
    # Start services
    docker-compose up -d frontend
    
    # Wait for service to be ready
    sleep 30
    
    # Health check
    if health_check "http://localhost:${FRONTEND_PORT:-3000}"; then
        echo "🎉 Deployment successful!"
    else
        echo "❌ Deployment failed health check"
        docker-compose logs frontend
        exit 1
    fi
}

# Kubernetes deployment (if using k8s)
deploy_kubernetes() {
    echo "☸️  Deploying to Kubernetes..."
    
    # Apply configurations
    kubectl apply -f k8s/$ENVIRONMENT/
    
    # Wait for rollout
    kubectl rollout status deployment/frontend -n $ENVIRONMENT --timeout=300s
    
    # Get service URL for health check
    SERVICE_URL=$(kubectl get service frontend -n $ENVIRONMENT -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "localhost")
    
    if health_check "http://$SERVICE_URL"; then
        echo "🎉 Kubernetes deployment successful!"
    else
        echo "❌ Kubernetes deployment failed health check"
        kubectl logs -l app=frontend -n $ENVIRONMENT --tail=50
        exit 1
    fi
}

# Main deployment logic
case "$DEPLOYMENT_TYPE" in
    "kubernetes"|"k8s")
        deploy_kubernetes
        ;;
    *)
        deploy_docker
        ;;
esac

echo "✅ Deployment to $ENVIRONMENT completed successfully!"