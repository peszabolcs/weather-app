import {useEffect, useState} from "react"
import { Search, Cloud, Sun, Droplet, Wind } from "lucide-react"


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    main: {
      temp: null,
      feels_like: null,
      humidity: null,
    },
    wind: {
      speed: null,
    },
    name: "",
    weather: [
      {
        description: "",
      }
    ],
  });
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Budapest");

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  if (error) {
    return <div>Hiba történt: {error.message}</div>
  }

  const fetchWeatherData = async (city) => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`);

    if (!response.ok) {
      throw new Error("Hiba a város lekérdezésekor");
    }

    const data = await response.json();
    setWeatherData(data);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Város keresése:", city)
    fetchWeatherData(city);
    setCity(city);
  }

  const temperature = weatherData?.main?.temp;
  // const feelsLike = weatherData?.main?.feels_like;
  const humidity = weatherData?.main?.humidity;
  const windSpeed = weatherData?.wind?.speed;
  // const locationName = weatherData?.name;
  const weatherDescription = weatherData?.weather?.[0]?.description;

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
              {weatherDescription?.toLowerCase().includes("napos") ? (
                  <Sun className="text-yellow-300" size={64} />
              ) : (
                  <Cloud className="text-white" size={64} />
              )}
              <span className="text-6xl font-bold text-white ml-4">{Math.round(temperature)}°C</span>
            </div>
            <p className="text-xl text-white mb-6">{weatherDescription}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-3">
                <Droplet className="text-blue-300 mr-2" size={24} />
                <span className="text-white">{humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-3">
                <Wind className="text-gray-300 mr-2" size={24} />
                <span className="text-white">{windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default WeatherApp;
