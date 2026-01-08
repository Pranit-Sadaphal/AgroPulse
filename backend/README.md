# AgroPulse Backend

FastAPI backend for the AgroPulse crop yield prediction system.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Train the model:
```bash
python train_model.py
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /predict` - Predict crop yield
- `GET /crops` - Get available crops
- `GET /soils` - Get available soil types

## Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

