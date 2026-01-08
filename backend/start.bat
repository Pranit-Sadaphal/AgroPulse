@echo off
REM AgroPulse Backend Startup Script for Windows

echo 🌾 Starting AgroPulse Backend...

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if model exists
if not exist "app\model\model.pkl" (
    echo Training ML model...
    python train_model.py
) else (
    echo Model already exists, skipping training...
)

REM Start server
echo Starting FastAPI server...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

