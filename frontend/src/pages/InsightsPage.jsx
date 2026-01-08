import { Droplet, Thermometer, Sprout, Wind, TrendingUp } from 'lucide-react'

const InsightsPage = () => {
  const factors = [
    {
      icon: Droplet,
      title: 'Rainfall',
      description: 'Optimal rainfall is crucial for crop growth. Most crops perform best with 600-1000mm annually.',
      impact: 'High',
      optimal: '800-1000mm',
      color: 'blue',
    },
    {
      icon: Thermometer,
      title: 'Temperature',
      description: 'Temperature affects photosynthesis and growth rates. Most crops thrive between 20-28°C.',
      impact: 'High',
      optimal: '20-28°C',
      color: 'red',
    },
    {
      icon: Sprout,
      title: 'Soil Type',
      description: 'Loamy soil is ideal for most crops due to balanced drainage and nutrient retention.',
      impact: 'Medium',
      optimal: 'Loamy > Clay > Silty > Sandy',
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: 'Fertilizer Usage',
      description: 'Proper fertilization increases yield, but excessive use can harm crops and soil.',
      impact: 'Medium',
      optimal: '150-200 kg/ha',
      color: 'purple',
    },
    {
      icon: Wind,
      title: 'Crop Type',
      description: 'Different crops have varying yield potentials and optimal growing conditions.',
      impact: 'High',
      optimal: 'Varies by crop',
      color: 'yellow',
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
      green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Agricultural Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Understanding how different factors influence crop yield can help you make better farming decisions.
            Explore the key factors that affect agricultural productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {factors.map((factor, index) => {
            const Icon = factor.icon
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${getColorClasses(factor.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {factor.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {factor.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Impact:</span>
                    <span className={`text-sm font-semibold ${
                      factor.impact === 'High' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {factor.impact}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Optimal:</span>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {factor.optimal}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Best Practices Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Best Practices for Maximum Yield
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Monitor Weather Patterns',
                description: 'Track rainfall and temperature trends to plan planting and harvesting times.',
              },
              {
                title: 'Soil Testing',
                description: 'Regular soil testing helps determine nutrient needs and optimal fertilizer application.',
              },
              {
                title: 'Crop Rotation',
                description: 'Rotate crops to maintain soil health and reduce pest and disease pressure.',
              },
              {
                title: 'Precision Agriculture',
                description: 'Use data-driven approaches to optimize inputs and maximize efficiency.',
              },
            ].map((practice, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {practice.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {practice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How AI Helps Section */}
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How AI Helps Predict Yield
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our machine learning models analyze complex relationships between multiple agricultural factors 
            to provide accurate yield predictions. The models are trained on historical agricultural data and 
            can identify patterns that might not be obvious to the human eye.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Pattern Recognition</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Identifies complex relationships between factors
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Data-Driven</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on real agricultural data and patterns
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Continuous Learning</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Models improve with more data over time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsightsPage

