#!/bin/bash

# 🚀 Dark Knight Technologies - Automated Deployment Script
# Epic 5 - Production Deployment Automation

set -e  # Exit on any error

# Configuration
APP_NAME="dark-knight-api"
DOCKER_IMAGE="$APP_NAME:latest"
BACKUP_IMAGE="$APP_NAME:backup"
HEALTH_ENDPOINT="http://localhost:8000/health"
MAX_HEALTH_CHECKS=30
HEALTH_CHECK_INTERVAL=2

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Health check function
health_check() {
    local port=${1:-8000}
    curl -sf "http://localhost:$port/health" > /dev/null 2>&1
}

# Pre-deployment checks
pre_deployment_checks() {
    log "Running pre-deployment checks..."
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        error "Docker is not running"
    fi
    
    # Check if port 8000 is available for new deployment
    if lsof -i :8001 > /dev/null 2>&1; then
        warning "Port 8001 is busy, cleaning up..."
        docker stop temp-deployment 2>/dev/null || true
        docker rm temp-deployment 2>/dev/null || true
    fi
    
    # Verify environment file exists
    if [[ ! -f ".env" ]]; then
        error "Environment file .env not found"
    fi
    
    success "Pre-deployment checks passed"
}

# Database backup
backup_database() {
    log "Creating database backup..."
    
    # Create backups directory if it doesn't exist
    mkdir -p ./backups
    
    local backup_file="./backups/backup_$(date +%Y%m%d_%H%M%S).sql"
    
    # For SQLite (development)
    if [[ -f "dark_knight.db" ]]; then
        cp dark_knight.db "./backups/dark_knight_backup_$(date +%Y%m%d_%H%M%S).db"
        success "SQLite database backed up"
    fi
    
    success "Database backup completed"
}

# Build new Docker image
build_image() {
    log "Building new Docker image..."
    
    # Build the new image
    docker build -t "$APP_NAME:new" . || error "Failed to build Docker image"
    
    success "Docker image built successfully"
}

# Deploy to staging environment (port 8001)
deploy_staging() {
    log "Deploying to staging environment..."
    
    # Stop any existing staging container
    docker stop temp-deployment 2>/dev/null || true
    docker rm temp-deployment 2>/dev/null || true
    
    # Start new container on port 8001
    docker run -d \
        --name temp-deployment \
        --env-file .env \
        -p 8001:8000 \
        "$APP_NAME:new" || error "Failed to start staging container"
    
    success "Staging deployment started"
}

# Wait for staging to be healthy
wait_for_health() {
    log "Waiting for staging environment to be healthy..."
    
    local attempts=0
    while [[ $attempts -lt $MAX_HEALTH_CHECKS ]]; do
        if health_check 8001; then
            success "Staging environment is healthy"
            return 0
        fi
        
        attempts=$((attempts + 1))
        log "Health check attempt $attempts/$MAX_HEALTH_CHECKS..."
        sleep $HEALTH_CHECK_INTERVAL
    done
    
    error "Staging environment failed to become healthy"
}

# Switch traffic from production to staging
switch_traffic() {
    log "Switching traffic to new deployment..."
    
    # Backup current production image
    if docker ps | grep -q "$APP_NAME:latest"; then
        docker tag "$APP_NAME:latest" "$BACKUP_IMAGE" 2>/dev/null || true
    fi
    
    # Stop current production container
    docker stop production 2>/dev/null || warning "No production container running"
    docker rm production 2>/dev/null || true
    
    # Start new production container
    docker run -d \
        --name production \
        --env-file .env \
        -p 8000:8000 \
        --restart unless-stopped \
        "$APP_NAME:new" || error "Failed to start production container"
    
    # Tag new image as latest
    docker tag "$APP_NAME:new" "$DOCKER_IMAGE"
    
    success "Traffic switched to new deployment"
}

# Cleanup staging environment
cleanup_staging() {
    log "Cleaning up staging environment..."
    
    docker stop temp-deployment 2>/dev/null || true
    docker rm temp-deployment 2>/dev/null || true
    
    success "Staging environment cleaned up"
}

# Post-deployment verification
post_deployment_verification() {
    log "Running post-deployment verification..."
    
    # Health check on production
    local attempts=0
    while [[ $attempts -lt 10 ]]; do
        if health_check 8000; then
            success "Production health check passed"
            break
        fi
        
        attempts=$((attempts + 1))
        sleep 2
    done
    
    if [[ $attempts -eq 10 ]]; then
        error "Production health check failed"
    fi
    
    # Test key endpoints
    log "Testing key API endpoints..."
    
    local endpoints=(
        "/health/detailed"
        "/api/v1/case-studies/stats"
    )
    
    for endpoint in "${endpoints[@]}"; do
        if curl -sf "http://localhost:8000$endpoint" > /dev/null; then
            success "Endpoint $endpoint is responding"
        else
            warning "Endpoint $endpoint is not responding"
        fi
    done
    
    success "Post-deployment verification completed"
}

# Rollback function
rollback() {
    log "Initiating rollback..."
    
    # Stop current production
    docker stop production 2>/dev/null || true
    docker rm production 2>/dev/null || true
    
    # Start backup container if it exists
    if docker images | grep -q "$BACKUP_IMAGE"; then
        docker run -d \
            --name production \
            --env-file .env \
            -p 8000:8000 \
            --restart unless-stopped \
            "$BACKUP_IMAGE" || error "Rollback failed"
        
        success "Rollback completed successfully"
    else
        error "No backup image available for rollback"
    fi
}

# Performance monitoring report
generate_performance_report() {
    log "Generating performance report..."
    
    # Get system metrics
    local memory_usage=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
    local disk_usage=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
    
    # Test response times
    local response_time=$(curl -o /dev/null -s -w '%{time_total}\n' http://localhost:8000/health)
    
    echo "📊 DEPLOYMENT PERFORMANCE REPORT"
    echo "================================"
    echo "Memory Usage: ${memory_usage}%"
    echo "Disk Usage: ${disk_usage}%"
    echo "Health Endpoint Response Time: ${response_time}s"
    echo "Deployment Time: $(date)"
    echo ""
    
    success "Performance report generated"
}

# Main deployment function
main() {
    echo ""
    echo "🚀 DARK KNIGHT TECHNOLOGIES - AUTOMATED DEPLOYMENT"
    echo "=================================================="
    echo ""
    
    case "${1:-deploy}" in
        "deploy")
            pre_deployment_checks
            backup_database
            build_image
            deploy_staging
            wait_for_health
            switch_traffic
            cleanup_staging
            post_deployment_verification
            generate_performance_report
            
            echo ""
            success "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
            echo ""
            log "Next steps:"
            echo "  - Monitor application metrics"
            log "  - Check logs: docker logs production"
            log "  - Performance dashboard: http://localhost:8000/health/detailed"
            echo ""
            ;;
            
        "rollback")
            rollback
            post_deployment_verification
            warning "🔄 ROLLBACK COMPLETED"
            ;;
            
        "status")
            if health_check 8000; then
                success "✅ Application is healthy"
                curl -s http://localhost:8000/health/detailed | python -m json.tool
            else
                error "❌ Application is not responding"
            fi
            ;;
            
        "logs")
            log "Showing recent application logs..."
            docker logs --tail=50 production
            ;;
            
        *)
            echo "Usage: $0 [deploy|rollback|status|logs]"
            echo ""
            echo "Commands:"
            echo "  deploy   - Deploy new version (default)"
            echo "  rollback - Rollback to previous version"
            echo "  status   - Check application status"
            echo "  logs     - Show recent logs"
            exit 1
            ;;
    esac
}

# Handle script interruption
trap 'error "Deployment interrupted"' INT TERM

# Run main function
main "$@"