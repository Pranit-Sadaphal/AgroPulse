#!/usr/bin/env python3
"""
Verification script to check if AgroPulse is set up correctly
"""

import os
import sys
from pathlib import Path

def check_file_exists(filepath, description):
    """Check if a file exists"""
    if Path(filepath).exists():
        print(f"[OK] {description}: {filepath}")
        return True
    else:
        print(f"[MISSING] {description} NOT FOUND: {filepath}")
        return False

def main():
    print("=" * 60)
    print("AgroPulse Setup Verification")
    print("=" * 60)
    print()
    
    all_good = True
    
    # Check backend files
    print("Checking Backend Files...")
    backend_files = [
        ("backend/requirements.txt", "Backend requirements"),
        ("backend/app/main.py", "FastAPI main file"),
        ("backend/app/schemas.py", "Pydantic schemas"),
        ("backend/train_model.py", "ML training script"),
        ("backend/Dockerfile", "Backend Dockerfile"),
    ]
    
    for filepath, desc in backend_files:
        if not check_file_exists(filepath, desc):
            all_good = False
    
    # Check frontend files
    print("\nChecking Frontend Files...")
    frontend_files = [
        ("frontend/package.json", "Frontend package.json"),
        ("frontend/vite.config.js", "Vite configuration"),
        ("frontend/tailwind.config.js", "Tailwind configuration"),
        ("frontend/src/App.jsx", "React App component"),
        ("frontend/src/pages/LandingPage.jsx", "Landing page"),
        ("frontend/src/pages/PredictionDashboard.jsx", "Prediction dashboard"),
        ("frontend/Dockerfile", "Frontend Dockerfile"),
    ]
    
    for filepath, desc in frontend_files:
        if not check_file_exists(filepath, desc):
            all_good = False
    
    # Check Docker files
    print("\nChecking Docker Files...")
    docker_files = [
        ("docker-compose.yml", "Docker Compose file"),
        ("docker-compose.dev.yml", "Docker Compose dev file"),
    ]
    
    for filepath, desc in docker_files:
        if not check_file_exists(filepath, desc):
            all_good = False
    
    # Check documentation
    print("\nChecking Documentation...")
    docs = [
        ("README.md", "Main README"),
        ("SETUP.md", "Setup guide"),
        ("DEPLOYMENT.md", "Deployment guide"),
    ]
    
    for filepath, desc in docs:
        if not check_file_exists(filepath, desc):
            all_good = False
    
    # Check model directory
    print("\nChecking Model Directory...")
    model_dir = Path("backend/app/model")
    if model_dir.exists():
        print(f"[OK] Model directory exists: {model_dir}")
        model_file = model_dir / "model.pkl"
        if model_file.exists():
            print(f"[OK] Trained model found: {model_file}")
        else:
            print(f"[WARNING] Model not trained yet. Run: cd backend && python train_model.py")
    else:
        print(f"[MISSING] Model directory NOT FOUND: {model_dir}")
        all_good = False
    
    print("\n" + "=" * 60)
    if all_good:
        print("[SUCCESS] All essential files are present!")
        print("\nNext steps:")
        print("1. Train the model: cd backend && python train_model.py")
        print("2. Start backend: cd backend && uvicorn app.main:app --reload")
        print("3. Start frontend: cd frontend && npm install && npm run dev")
    else:
        print("[ERROR] Some files are missing. Please check the errors above.")
        sys.exit(1)
    print("=" * 60)

if __name__ == "__main__":
    main()

