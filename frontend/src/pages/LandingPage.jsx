import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Leaf, BarChart3, Zap } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              AgroPulse
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
              Predicting Tomorrow's Harvest with AI Today
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Make data-driven decisions for your crops with our AI-powered yield prediction system. 
              Optimize your farming strategy and maximize your harvest potential.
            </p>
            <Link
              to="/predict"
              className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4"
            >
              <span>Predict Yield</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose AgroPulse?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                AI-Powered Predictions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced machine learning models trained on agricultural data to provide accurate yield predictions.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Understand how different factors like rainfall, temperature, and soil type affect your crop yield.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <Leaf className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Farmer-Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simple, intuitive interface designed for farmers and agricultural planners of all technical levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Select Crop', desc: 'Choose your crop type' },
              { step: '2', title: 'Input Data', desc: 'Enter soil, weather, and fertilizer details' },
              { step: '3', title: 'AI Analysis', desc: 'Our model analyzes the factors' },
              { step: '4', title: 'Get Prediction', desc: 'Receive accurate yield forecast' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Harvest?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start predicting your crop yields today and make informed farming decisions.
          </p>
          <Link
            to="/predict"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <span>Get Started</span>
            <TrendingUp size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

