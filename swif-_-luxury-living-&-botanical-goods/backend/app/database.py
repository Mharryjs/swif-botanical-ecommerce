"""
Database connection and session pooling module for PostgreSQL.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://swif_user:swif_secure_pass@localhost:5432/swif_ecommerce"
)

# Production connection pool settings
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=1800,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency that yields a managed database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
