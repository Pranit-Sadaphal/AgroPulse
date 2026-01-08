import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart3, TrendingUp, AlertCircle, Loader2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const PredictionDashboard = () => {
  const [formData, setFormData] = useState({
    crop_type: 'Wheat',
    soil_type: 'Loamy',
    rainfall_mm: 800,
    temperature_c: 25,
    fertilizer_kg_ha: 150,
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [crops, setCrops] = useState([])
  const [soils, setSoils] = useState([])

  useEffect(() => {
    // Fetch available crops and soils
    axios.get(`${API_URL}/crops`)
      .then(res => setCrops(res.data.crops))
      .catch(err => console.error('Error fetching crops:', err))
    
    axios.get(`${API_URL}/soils`)
      .then(res => setSoils(res.data.soils))
      .catch(err => console.error('Error fetching soils:', err))
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await axios.post(`${API_URL}/predict`, formData)
      setPrediction(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while predicting yield')
    } finally {
      setLoading(false)
    }
  }

  const handleSampleData = () => {
    const samples = [
      { crop_type: 'Rice', soil_type: 'Loamy', rainfall_mm: 1000, temperature_c: 28, fertilizer_kg_ha: 180 },
      { crop_type: 'Corn', soil_type: 'Clay', rainfall_mm: 700, temperature_c: 22, fertilizer_kg_ha: 200 },
      { crop_type: 'Wheat', soil_type: 'Sandy', rainfall_mm: 600, temperature_c: 20, fertilizer_kg_ha: 120 },
    ]
    const randomSample = samples[Math.floor(Math.random() * samples.length)]
    setFormData(randomSample)
  }

  const featureImportanceData = prediction?.feature_importance
    ? Object.entries(prediction.feature_importance)
        .map(([name, value]) => ({
          name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: (value * 100).toFixed(1),
        }))
        .sort((a, b) => b.value - a.value)
    : []

  const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Crop Yield Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your agricultural data to get AI-powered yield predictions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Input Parameters
              </h2>
              <button
                onClick={handleSampleData}
                className="text-sm btn-secondary py-1 px-3"
              >
                Sample Data
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Crop Type
                </label>
                <select
                  value={formData.crop_type}
                  onChange={(e) => handleInputChange('crop_type', e.target.value)}
                  className="input-field"
                >
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Soil Type
                </label>
                <select
                  value={formData.soil_type}
                  onChange={(e) => handleInputChange('soil_type', e.target.value)}
                  className="input-field"
                >
                  {soils.map(soil => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              {/* Rainfall */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rainfall: {formData.rainfall_mm} mm
                </label>
                <input
                  type="range"
                  min="300"
                  max="1500"
                  step="10"
                  value={formData.rainfall_mm}
                  onChange={(e) => handleInputChange('rainfall_mm', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>300 mm</span>
                  <span>1500 mm</span>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperature: {formData.temperature_c}°C
                </label>
                <input
                  type="range"
                  min="15"
                  max="35"
                  step="0.5"
                  value={formData.temperature_c}
                  onChange={(e) => handleInputChange('temperature_c', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>15°C</span>
                  <span>35°C</span>
                </div>
              </div>

              {/* Fertilizer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fertilizer Usage: {formData.fertilizer_kg_ha} kg/ha
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="5"
                  value={formData.fertilizer_kg_ha}
                  onChange={(e) => handleInputChange('fertilizer_kg_ha', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>50 kg/ha</span>
                  <span>300 kg/ha</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Predicting...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 size={20} />
                    <span>Predict Yield</span>
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-700 dark:text-red-400">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Prediction Results */}
          <div className="space-y-6">
            {prediction && (
              <>
                {/* Prediction Card */}
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Predicted Yield
                    </h2>
                  </div>
                  
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {prediction.predicted_yield.toFixed(2)}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      tons/hectare
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Confidence Range
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {prediction.confidence_lower.toFixed(2)} - {prediction.confidence_upper.toFixed(2)} tons/ha
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Importance */}
                {featureImportanceData.length > 0 && (
                  <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Feature Impact
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={featureImportanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                        <XAxis 
                          dataKey="name" 
                          className="text-xs"
                          tick={{ fill: 'currentColor' }}
                        />
                        <YAxis 
                          label={{ value: 'Importance %', angle: -90, position: 'insideLeft' }}
                          tick={{ fill: 'currentColor' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {featureImportanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </>
            )}

            {!prediction && !loading && (
              <div className="card text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the form and click "Predict Yield" to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionDashboard

