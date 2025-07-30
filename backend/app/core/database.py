from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import settings
import asyncio
import logging

logger = logging.getLogger(__name__)

# Sync engine for migrations
if "sqlite" in settings.DATABASE_URL:
    engine = create_engine(settings.DATABASE_URL.replace("sqlite+aiosqlite://", "sqlite://"))
else:
    engine = create_engine(settings.DATABASE_URL.replace("postgresql://", "postgresql://"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Async engine for FastAPI
if "sqlite" in settings.DATABASE_URL:
    async_engine = create_async_engine(settings.DATABASE_URL)
else:
    async_engine = create_async_engine(
        settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
    )
AsyncSessionLocal = async_sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_async_session():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

def get_sync_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def test_database_connection() -> dict:
    """Test database connection and return status"""
    try:
        async with AsyncSessionLocal() as session:
            # Test basic connection
            if "sqlite" in settings.DATABASE_URL:
                result = await session.execute(text("SELECT 1"))
            else:
                result = await session.execute(text("SELECT version()"))
            
            row = result.first()
            if row:
                return {
                    "status": "healthy",
                    "database_type": "sqlite" if "sqlite" in settings.DATABASE_URL else "postgresql",
                    "connection": "successful",
                    "version": str(row[0]) if not "sqlite" in settings.DATABASE_URL else "sqlite",
                    "message": "Database connection is working"
                }
            else:
                return {
                    "status": "error",
                    "message": "Database query returned no results"
                }
                
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        return {
            "status": "error",
            "message": f"Database connection failed: {str(e)}"
        }

async def check_database_tables() -> dict:
    """Check if required tables exist"""
    try:
        async with AsyncSessionLocal() as session:
            # Check for contact_submissions table
            if "sqlite" in settings.DATABASE_URL:
                contact_check = await session.execute(
                    text("SELECT name FROM sqlite_master WHERE type='table' AND name='contact_submissions'")
                )
                roi_check = await session.execute(
                    text("SELECT name FROM sqlite_master WHERE type='table' AND name='roi_calculations'")
                )
            else:
                contact_check = await session.execute(
                    text("SELECT tablename FROM pg_tables WHERE tablename='contact_submissions'")
                )
                roi_check = await session.execute(
                    text("SELECT tablename FROM pg_tables WHERE tablename='roi_calculations'")
                )
            
            contact_exists = contact_check.first() is not None
            roi_exists = roi_check.first() is not None
            
            return {
                "status": "healthy" if contact_exists and roi_exists else "warning",
                "contact_submissions_table": "exists" if contact_exists else "missing",
                "roi_calculations_table": "exists" if roi_exists else "missing",
                "message": "All tables exist" if contact_exists and roi_exists else "Some tables are missing"
            }
            
    except Exception as e:
        logger.error(f"Database table check failed: {e}")
        return {
            "status": "error",
            "message": f"Table check failed: {str(e)}"
        }

async def get_database_stats() -> dict:
    """Get database statistics"""
    try:
        async with AsyncSessionLocal() as session:
            # Count records in tables  
            contact_count = await session.execute(text("SELECT COUNT(*) FROM contact_submissions"))
            roi_count = await session.execute(text("SELECT COUNT(*) FROM roi_calculations"))
            
            contact_total = contact_count.scalar()
            roi_total = roi_count.scalar()
            
            return {
                "status": "healthy",
                "contact_submissions_count": contact_total,
                "roi_calculations_count": roi_total,
                "total_records": contact_total + roi_total
            }
            
    except Exception as e:
        logger.error(f"Database stats check failed: {e}")
        return {
            "status": "error",
            "message": f"Stats check failed: {str(e)}"
        }