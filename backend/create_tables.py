"""
Script to create database tables in Supabase.
Run this once to set up the database schema.
"""

from app.database import engine, Base

def create_tables():
    """
    Create all tables defined in the models.
    """
    print("Creating tables in Supabase...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    create_tables()