# Quick Setup Guide

## Prerequisites

- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

## Step-by-Step Setup

### Option 1: Local Development (Recommended for Development)

#### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the ML model (IMPORTANT!)
python train_model.py

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: http://localhost:8000

#### 2. Frontend Setup (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: http://localhost:5173

### Option 2: Docker (Recommended for Production)

```bash
# First, train the model locally
cd backend
python train_model.py
cd ..

# Then start with Docker Compose
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Verify Installation

1. Check backend: http://localhost:8000/health
2. Check frontend: http://localhost:5173
3. Try a prediction on the dashboard

## Troubleshooting

### Model Not Found Error

If you see "Model not found", run:
```bash
cd backend
python train_model.py
```

### Port Already in Use

Change ports in:
- Backend: `uvicorn app.main:app --port 8001`
- Frontend: Update `vite.config.js` port
- Docker: Update `docker-compose.yml` ports

### CORS Errors

Ensure backend CORS allows your frontend URL in `backend/app/main.py`

