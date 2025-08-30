"""
Water Hyacinth Prediction API
============================

FastAPI backend for water hyacinth growth prediction with ML integration and OpenAI LLM insights.
"""

import logging
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import local modules
logger.info("Importing local modules...")
from .database import get_db, engine
from .models import Base
from .routers import predictions, insights, image_predictions

# Load environment variables
logger.info("Loading environment variables...")
load_dotenv()
logger.info("Environment variables loaded.")

# Create database tables
logger.info("Creating database tables...")
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully.")
except Exception as e:
    logger.error(f"Failed to create database tables: {e}")
    raise

# Initialize FastAPI app
app = FastAPI(
    title="Water Hyacinth Prediction API",
    description="AI-driven water hyacinth growth prediction with futuristic insights",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predictions.router, prefix="/api/v1", tags=["predictions"])
app.include_router(insights.router, prefix="/api/v1", tags=["insights"])
app.include_router(image_predictions.router, prefix="/api/v1", tags=["image-predictions"])

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Water Hyacinth Prediction API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "water-hyacinth-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)