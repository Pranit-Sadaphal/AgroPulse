@echo off
echo ========================================
echo   AgroPulse - Starting Application
echo ========================================
echo.

REM Check if model exists
if not exist "backend\app\model\model.pkl" (
    echo [STEP 1/3] Training ML Model...
    echo.
    cd backend
    if not exist "venv" (
        echo Creating virtual environment...
        python -m venv venv
    )
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -r requirements.txt >nul 2>&1
    echo Training model (this may take a minute)...
    python train_model.py
    cd ..
    echo.
    echo [SUCCESS] Model trained successfully!
    echo.
) else (
    echo [SKIP] Model already exists, skipping training...
    echo.
)

echo [STEP 2/3] Starting Backend Server...
echo Backend will run at: http://localhost:8000
echo.
start "AgroPulse Backend" cmd /k "cd backend && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000) else (python -m venv venv && call venv\Scripts\activate.bat && pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000)"

timeout /t 3 /nobreak >nul

echo [STEP 3/3] Starting Frontend Server...
echo Frontend will run at: http://localhost:5173
echo.
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies (first time only)...
    call npm install
)
start "AgroPulse Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit this window...
echo (The app will continue running in separate windows)
pause >nul

