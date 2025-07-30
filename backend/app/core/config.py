from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///./dark_knight.db"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Dark Knight Technologies API"
    DEBUG: bool = True
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # Email settings
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    FROM_EMAIL: str = "noreply@darkknight.tech"
    
    # Rate limiting settings
    RATE_LIMIT_REQUESTS: int = 10
    RATE_LIMIT_WINDOW: int = 60  # seconds
    
    class Config:
        env_file = ".env"

settings = Settings()