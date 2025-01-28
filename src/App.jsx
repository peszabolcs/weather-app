import {useEffect, useState} from "react"
import { Search, Cloud, Sun, Droplet, Wind } from "lucide-react"
import "./index.css"
import { Dialog, DialogContent, DialogDescription, DialogTitle} from "/src/components/components/ui/Dialog.jsx"
import "./App.css"


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    main: { temp: null, feels_like: null, humidity: null },
    wind: { speed: null },
    name: "",
    weather: [{ description: "", }],
  });
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Budapest");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [displayCity, setDisplayCity] = useState("Budapest");

  useEffect(() => {
    fetchWeatherData(displayCity);
  }, [displayCity]);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`,
      )

      if (!response.ok) {
        throw new Error("Hiba a város lekérdezésekor")
      }

      const data = await response.json()
      setWeatherData(data)
      setError(null)
      return true;
    } catch (err) {
      setError(err)
      setIsErrorModalOpen(true)
      return false;
    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Város keresése:", city)
    const  isSuccess = await fetchWeatherData(city);
    if (isSuccess) {
      setDisplayCity(city)
    }
  }

  const closeErrorModal = () => {
    setIsErrorModalOpen(false)
  }

  const temperature = weatherData?.main?.temp;
  const humidity = weatherData?.main?.humidity;
  const windSpeed = weatherData?.wind?.speed;
  const weatherDescription = weatherData?.weather?.[0]?.description;

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center px-4">
        <div className="rounded-3xl p-8 max-w-md w-full shadow-lg">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Adja meg a város nevét"
                  className="w-full py-3 px-4 pr-12 rounded-full bg-custom text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-white" size={20} />
              </button>
            </div>
          </form>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{displayCity}</h2>
            <div className="flex justify-center items-center mb-6">
              {weatherDescription?.toLowerCase().includes("napos") ? (
                  <Sun className="text-yellow-300" size={64} />
              ) : (
                  <Cloud className="text-white" size={64} />
              )}
              <span className="text-6xl font-bold text-white ml-4">{Math.round(temperature)}°C</span>
            </div>
            <p className="text-xl text-white mb-6">{weatherDescription}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-custom rounded-xl p-3">
                <Droplet className="text-blue-300 mr-2" size={24} />
                <span className="text-white">{humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-custom rounded-xl p-3">
                <Wind className="text-gray-300 mr-2" size={24} />
                <span className="text-white">{windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
          <DialogContent>
            <DialogTitle>Hiba történt</DialogTitle>
            <DialogDescription>
              {"Nem sikerült lekérdezni az időjárási adatokat. Kérjük, ellenőrizze a város nevét, és" +
                  " próbálja újra."}
            </DialogDescription>
            <button onClick={closeErrorModal}>Rendben</button>
          </DialogContent>
        </Dialog>
      </div>

  )
}

export default WeatherApp;
