import React, { useState } from "react"
import { Search, Cloud, Sun, Droplet, Wind } from "lucide-react"

const WeatherApp = () => {
  const [city, setCity] = useState("Budapest")
  const weatherData = {
    temperature: 22,
    description: "Napos",
    humidity: 60,
    windSpeed: 5,
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Város keresése:", city)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center px-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-lg">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Adja meg a város nevét"
                  className="w-full py-3 px-4 pr-12 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-white" size={20} />
              </button>
            </div>
          </form>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{city}</h2>
            <div className="flex justify-center items-center mb-6">
              {weatherData.description.toLowerCase().includes("napos") ? (
                  <Sun className="text-yellow-300" size={64} />
              ) : (
                  <Cloud className="text-white" size={64} />
              )}
              <span className="text-6xl font-bold text-white ml-4">{weatherData.temperature}°C</span>
            </div>
            <p className="text-xl text-white mb-6">{weatherData.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-3">
                <Droplet className="text-blue-300 mr-2" size={24} />
                <span className="text-white">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-3">
                <Wind className="text-gray-300 mr-2" size={24} />
                <span className="text-white">{weatherData.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WeatherApp
