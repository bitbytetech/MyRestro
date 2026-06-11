from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MyRestro API"
    
    # DATABASE_URL configuration:
    # 1. For Docker: "postgresql://postgres:postgres@db:5432/myrestro"
    # 2. For Local Windows (No Docker): "postgresql://postgres:PASSWORD@localhost:5432/myrestro"
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/myrestro"
    
    SECRET_KEY: str = "SUPER_SECRET_KEY"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
