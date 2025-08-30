"""
Database configuration and session management for Water Hyacinth Prediction API.
"""

import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
logger.info("Loading environment variables in database.py...")
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://tfftuzirhqqhqfqyggek.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
logger.info(f"SUPABASE_URL: {SUPABASE_URL}")
logger.info(f"SUPABASE_KEY present: {bool(SUPABASE_KEY)}")

# Database URL - use Supabase PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:[YOUR-PASSWORD]@db.tfftuzirhqqhqfqyggek.supabase.co:5432/postgres")
logger.info(f"DATABASE_URL: {DATABASE_URL}")

# Create Supabase client
logger.info("Creating Supabase client...")
try:
    if SUPABASE_URL and SUPABASE_KEY:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("Supabase client created successfully.")
    else:
        supabase = None
        logger.info("Supabase client not created (missing credentials).")
except Exception as e:
    logger.error(f"Failed to create Supabase client: {e}")
    supabase = None

# Create engine
logger.info("Creating database engine...")
try:
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    )
    logger.info("Database engine created successfully.")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    raise

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

def get_db():
    """
    Dependency to get database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_supabase():
    """
    Dependency to get Supabase client.
    """
    return supabase