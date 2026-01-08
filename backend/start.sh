#!/bin/bash

# AgroPulse Backend Startup Script

echo "🌾 Starting AgroPulse Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if model exists
if [ ! -f "app/model/model.pkl" ]; then
    echo "Training ML model..."
    python train_model.py
else
    echo "Model already exists, skipping training..."
fi

# Start server
echo "Starting FastAPI server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

