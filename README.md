# 🌾 AgroPulse - AI-Powered Crop Yield Prediction System

> **Predicting Tomorrow's Harvest with AI Today**

AgroPulse is a production-ready web application that uses machine learning regression models to predict crop yields based on agricultural factors such as rainfall, temperature, soil type, fertilizer usage, and crop type. Built with modern technologies and best practices, it helps farmers and agricultural planners make data-driven decisions.

![AgroPulse](https://img.shields.io/badge/AgroPulse-AI%20Powered-green)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Deployment](#docker-deployment)
- [API Documentation](#-api-documentation)
- [Machine Learning](#-machine-learning)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🤖 **AI-Powered Predictions**: Advanced machine learning models (Random Forest, Linear Regression) for accurate yield forecasting
- 📊 **Interactive Dashboard**: Modern, responsive UI with real-time predictions and visualizations
- 🌓 **Dark/Light Mode**: User-friendly theme toggle for comfortable viewing
- 📈 **Feature Impact Analysis**: Visual representation of how each factor affects yield
- 💡 **Educational Insights**: Comprehensive guide on agricultural factors and best practices
- 🐳 **Docker Ready**: Easy deployment with Docker and Docker Compose
- ☁️ **Cloud Compatible**: Ready for deployment on Render, Railway, AWS, and other platforms

## 🛠 Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Python 3.11** - Programming language
- **FastAPI** - Modern, fast web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **SQLite** - Local database (development)
- **PostgreSQL** - Production database (ready)

## 📁 Project Structure

```
AgroPulse/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── PredictionDashboard.jsx
│   │   │   └── InsightsPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── schemas.py
│   │   └── model/
│   │       └── .gitkeep
│   ├── train_model.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- **Docker** and **Docker Compose** (optional, for containerized deployment)

### Local Development

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd AgroPulse
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the ML model
python train_model.py

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

### Docker Deployment

#### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Note**: Before running Docker, ensure you've trained the model:

```bash
cd backend
python train_model.py
```

The model files will be saved in `backend/app/model/` and will be mounted in the container.

#### Development Mode with Docker

```bash
# Use development compose file
docker-compose -f docker-compose.dev.yml up --build
```

## 📚 API Documentation

### Base URL

- **Local**: `http://localhost:8000`
- **Production**: `https://your-domain.com`

### Endpoints

#### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "AgroPulse API is operational"
}
```

#### Predict Yield

```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "crop_type": "Wheat",
  "soil_type": "Loamy",
  "rainfall_mm": 800.0,
  "temperature_c": 25.0,
  "fertilizer_kg_ha": 150.0
}
```

**Response:**
```json
{
  "predicted_yield": 5.23,
  "confidence_lower": 4.71,
  "confidence_upper": 5.75,
  "feature_importance": {
    "crop_type": 0.25,
    "soil_type": 0.20,
    "rainfall_mm": 0.15,
    "temperature_c": 0.20,
    "fertilizer_kg_ha": 0.20
  }
}
```

#### Get Available Crops

```http
GET /crops
```

**Response:**
```json
{
  "crops": ["Wheat", "Rice", "Corn", "Soybean", "Barley", "Potato"]
}
```

#### Get Available Soil Types

```http
GET /soils
```

**Response:**
```json
{
  "soils": ["Loamy", "Clay", "Sandy", "Silty"]
}
```

### Interactive API Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🤖 Machine Learning

### Model Training

The ML pipeline includes:

1. **Dataset Generation**: Realistic agricultural dataset with 2000 samples
2. **Data Preprocessing**: Label encoding, feature scaling
3. **Model Training**: 
   - Linear Regression (baseline)
   - Random Forest Regressor (primary)
4. **Model Evaluation**: MAE, RMSE, R² metrics
5. **Model Persistence**: Saved as `model.pkl` with preprocessors

### Training the Model

```bash
cd backend
python train_model.py
```

This will:
- Generate a synthetic agricultural dataset
- Train both Linear Regression and Random Forest models
- Evaluate and compare models
- Save the best model to `app/model/model.pkl`
- Save preprocessors (scaler, label encoders)

### Model Performance

The Random Forest model typically achieves:
- **R² Score**: ~0.85-0.90
- **MAE**: ~0.5-0.7 tons/hectare
- **RMSE**: ~0.7-0.9 tons/hectare

### Features

- **Crop Type**: Wheat, Rice, Corn, Soybean, Barley, Potato
- **Soil Type**: Loamy, Clay, Sandy, Silty
- **Rainfall**: 300-1500 mm
- **Temperature**: 15-35°C
- **Fertilizer**: 50-300 kg/hectare

## ☁️ Deployment

### Render Deployment

1. **Backend**:
   - Connect your GitHub repository
   - Select `backend` as root directory
   - Build command: `pip install -r requirements.txt && python train_model.py`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables if needed

2. **Frontend**:
   - Connect your GitHub repository
   - Select `frontend` as root directory
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`

### Railway Deployment

1. **Backend**:
   - Create new project from GitHub
   - Select `backend` directory
   - Railway will auto-detect Python
   - Add start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Run `train_model.py` in setup or use a startup script

2. **Frontend**:
   - Create new project from GitHub
   - Select `frontend` directory
   - Railway will auto-detect Node.js
   - Add build command: `npm run build`
   - Add start command: `npx serve -s dist`

### AWS Deployment

1. **Backend (EC2/ECS)**:
   - Use Dockerfile for containerization
   - Deploy to ECS or EC2 with Docker
   - Configure security groups for port 8000

2. **Frontend (S3 + CloudFront)**:
   - Build: `npm run build`
   - Upload `dist/` to S3 bucket
   - Configure CloudFront for CDN
   - Set up CORS for API access

### Environment Variables

**Backend (.env)**:
```env
ENVIRONMENT=production
DATABASE_URL=postgresql://user:password@host:5432/dbname
API_URL=https://your-backend-url.com
```

**Frontend (.env)**:
```env
VITE_API_URL=https://your-backend-url.com
```

## 📸 Screenshots

### Landing Page
*Modern, professional landing page with hero section and features*

### Prediction Dashboard
*Interactive form with sliders, real-time predictions, and feature importance charts*

### Insights Page
*Educational content explaining agricultural factors and best practices*

*Note: Add actual screenshots to your repository*

## 🧪 Testing

### Backend Testing

```bash
cd backend
pytest  # If tests are added
```

### Frontend Testing

```bash
cd frontend
npm test  # If tests are added
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Pranit Sadaphal**

## 🙏 Acknowledgments

- Scikit-learn community for excellent ML tools
- FastAPI for the amazing web framework
- React and Vite teams for the frontend tooling
- All open-source contributors

## 📧 Contact

For questions or support, please open an issue on GitHub.

