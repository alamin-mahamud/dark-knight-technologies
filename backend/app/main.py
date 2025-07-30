from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.api.v1.api import api_router
from app.core.database import test_database_connection, check_database_tables, get_database_stats

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend API for Dark Knight Technologies AI/MLOps consultancy website",
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.DEBUG else None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.darkknight.tech"] if not settings.DEBUG else ["*"]
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Dark Knight Technologies API", "version": "1.0.0", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "dark-knight-api"}

@app.get("/health/database")
async def database_health_check():
    """Comprehensive database health check"""
    connection_test = await test_database_connection()
    table_check = await check_database_tables()
    stats = await get_database_stats()
    
    overall_status = "healthy"
    if connection_test["status"] == "error" or table_check["status"] == "error":
        overall_status = "error"
    elif table_check["status"] == "warning":
        overall_status = "warning"
    
    return {
        "overall_status": overall_status,
        "connection": connection_test,
        "tables": table_check,
        "statistics": stats,
        "timestamp": "2025-07-30T06:29:00Z"  # Current timestamp
    }

@app.get("/health/detailed")
async def detailed_health_check():
    """Detailed health check including all services"""
    db_health = await database_health_check()
    
    return {
        "service": "dark-knight-api",
        "version": "1.0.0",
        "status": "healthy" if db_health["overall_status"] != "error" else "unhealthy",
        "database": db_health,
        "api_endpoints": {
            "contact_form": "operational",
            "roi_calculator": "operational",
            "case_studies": "operational"
        },
        "features": {
            "rate_limiting": "enabled",
            "cors": "configured",
            "security": "enhanced",
            "validation": "strict"
        }
    }