import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PredictionDashboard from './pages/PredictionDashboard'
import InsightsPage from './pages/InsightsPage'
import Navbar from './components/Navbar'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<PredictionDashboard />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

