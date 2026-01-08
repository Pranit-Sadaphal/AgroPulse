# 🚀 How to Start AgroPulse

## Quick Start (Easiest Method)

### Windows:
Double-click `start-app.bat` or run:
```bash
start-app.bat
```

### macOS/Linux:
```bash
chmod +x start-app.sh
./start-app.sh
```

This script will:
1. ✅ Train the ML model (if not already trained)
2. ✅ Start the backend server
3. ✅ Start the frontend server

---

## Manual Start (Step-by-Step)

### Step 1: Train the ML Model (Required First Time)

**Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python train_model.py
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python train_model.py
```

⏱️ This takes about 1-2 minutes. You'll see training progress and model metrics.

### Step 2: Start Backend Server

**Keep the terminal from Step 1 open, or open a new one:**

**Windows:**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**macOS/Linux:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

✅ Backend runs at: **http://localhost:8000**
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Step 3: Start Frontend Server

**Open a NEW terminal window:**

```bash
cd frontend
npm install    # Only needed first time
npm run dev
```

✅ Frontend runs at: **http://localhost:5173**

### Step 4: Open the App

Open your browser and go to: **http://localhost:5173**

---

## Using Docker (Alternative Method)

### Prerequisites:
- Docker Desktop installed
- Model must be trained first

### Steps:

1. **Train model first:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python train_model.py
cd ..
```

2. **Start with Docker:**
```bash
docker-compose up --build
```

This starts both frontend and backend in containers.

---

## Verify Everything Works

1. **Check Backend:**
   - Open: http://localhost:8000/health
   - Should see: `{"status":"healthy","message":"AgroPulse API is operational"}`

2. **Check Frontend:**
   - Open: http://localhost:5173
   - Should see the AgroPulse landing page

3. **Test Prediction:**
   - Click "Predict Yield" button
   - Fill in the form
   - Click "Predict Yield"
   - Should see prediction results!

---

## Troubleshooting

### ❌ "Model not found" error
**Solution:** Run `python train_model.py` in the backend directory

### ❌ Port 8000 already in use
**Solution:** 
- Find what's using port 8000: `netstat -ano | findstr :8000` (Windows)
- Kill the process or change port: `uvicorn app.main:app --port 8001`

### ❌ Port 5173 already in use
**Solution:** 
- Change port in `frontend/vite.config.js` or use: `npm run dev -- --port 3000`

### ❌ "Module not found" errors
**Solution:** 
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

### ❌ CORS errors
**Solution:** 
- Make sure backend is running on port 8000
- Check `backend/app/main.py` CORS settings

### ❌ Python not found
**Solution:** 
- Install Python 3.11+ from python.org
- Make sure Python is in your PATH

### ❌ Node/npm not found
**Solution:** 
- Install Node.js 18+ from nodejs.org
- Restart terminal after installation

---

## What's Running?

- **Backend (FastAPI):** Port 8000
  - Handles API requests
  - Runs ML predictions
  - Serves API documentation

- **Frontend (React):** Port 5173
  - User interface
  - Makes API calls to backend
  - Displays predictions and charts

---

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 📖 Read [SETUP.md](SETUP.md) for detailed setup
- 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to cloud
- 🔍 Explore API docs at http://localhost:8000/docs

---

**Need Help?** Check the error messages - they usually tell you exactly what's wrong!

