#!/bin/bash

echo "========================================"
echo "  AgroPulse - Starting Application"
echo "========================================"
echo ""

# Check if model exists
if [ ! -f "backend/app/model/model.pkl" ]; then
    echo "[STEP 1/3] Training ML Model..."
    echo ""
    cd backend
    if [ ! -d "venv" ]; then
        echo "Creating virtual environment..."
        python3 -m venv venv
    fi
    echo "Activating virtual environment..."
    source venv/bin/activate
    echo "Installing dependencies..."
    pip install -r requirements.txt -q
    echo "Training model (this may take a minute)..."
    python train_model.py
    deactivate
    cd ..
    echo ""
    echo "[SUCCESS] Model trained successfully!"
    echo ""
else
    echo "[SKIP] Model already exists, skipping training..."
    echo ""
fi

echo "[STEP 2/3] Starting Backend Server..."
echo "Backend will run at: http://localhost:8000"
echo ""
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

sleep 3

echo "[STEP 3/3] Starting Frontend Server..."
echo "Frontend will run at: http://localhost:5173"
echo ""
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies (first time only)..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Application Started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services..."
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

