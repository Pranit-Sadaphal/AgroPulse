# 🚀 Quick Start Guide

Get AgroPulse up and running in 5 minutes!

## Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

## Step 1: Train the Model

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python train_model.py
```

This creates the ML model needed for predictions.

## Step 2: Start Backend

```bash
# In backend directory
uvicorn app.main:app --reload
```

Backend runs at: http://localhost:8000

## Step 3: Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

## Step 4: Use the App

1. Open http://localhost:5173 in your browser
2. Click "Predict Yield" or navigate to `/predict`
3. Fill in the form with your agricultural data
4. Click "Predict Yield" to see results!

## Alternative: Docker

```bash
# Train model first (one time)
cd backend
python train_model.py
cd ..

# Start everything with Docker
docker-compose up --build
```

## Verify Setup

Run the verification script:

```bash
python verify_setup.py
```

## Troubleshooting

**Model not found?**
- Make sure you ran `python train_model.py` in the backend directory

**Port already in use?**
- Change ports in `vite.config.js` (frontend) or use `--port` flag (backend)

**CORS errors?**
- Check that backend is running on port 8000
- Verify CORS settings in `backend/app/main.py`

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for cloud deployment
- Explore the [API docs](http://localhost:8000/docs) when backend is running

Happy farming! 🌾

