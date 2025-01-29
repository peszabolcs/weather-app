import {useEffect, useState} from "react"
import { Search, Cloud, Sun, Droplet, Wind, CloudRain, CloudLightning, CloudSnow,  CloudFog,  MoonStar } from "lucide-react"
import "./index.css"
import { Dialog, DialogContent, DialogDescription, DialogTitle} from "/src/components/components/ui/Dialog.jsx"


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
  const rain = weatherData?.rain?.["1h"];
  const windSpeed = weatherData?.wind?.speed;
  const weatherDescription = weatherData?.weather?.[0]?.description;



  const getWeatherIcon = () => {
    const description = weatherDescription.toLowerCase();
    const localTime = new Date(Date.now() + weatherData.timezone * 1000);
    const currentHour = localTime.getUTCHours();
    const isNight = currentHour >= 20 || currentHour < 6;

    if (description.includes("tiszta")) {
      return isNight ? <MoonStar className="text-blue-300" size={64} /> : <Sun className="text-yellow-300" size={64} />;
    } else if (description.includes("felhős") || description.includes("borús") || description.includes("erős" +
        " felhőzet")) {
      return <Cloud className="text-gray-300" size={64} />;
    } else if (description.includes("enyhe") || description.includes("szitálás") || description.includes("közepes")) {
      return <CloudRain className="text-blue-400" size={64} />;
    } else if (description.includes("zivatar") || description.includes("vihar") || description.includes("dörög") || description.includes("heves intenzitású")) {
        return <CloudLightning className="text-yellow-500" size={64} />;
    } else if (description.includes("havazás") || description.includes("havas") || description.includes("havazik") || description.includes("hó")) {
        return <CloudSnow className="text-white" size={64} />;
    } else if (description.includes("köd") || description.includes("párás") || description.includes("ködös")) {
        return <CloudFog className="text-gray-300" size={64} />;
    } else {
        return <Cloud className="text-gray-300" size={64} />;
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-col px-4">
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
              {getWeatherIcon()}
              <span className="text-6xl font-bold text-white ml-4">{Math.round(temperature)}°C</span>
            </div>
            <p className="text-xl text-white mb-6">{weatherDescription}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-custom rounded-xl p-3">
                <Droplet className="text-blue-300 mr-2" size={24} />
                <span className="text-white">{rain > 0 ? rain : 0} mm/h</span>
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
        <div className="mt-12 sm:mt-16 md:mt-24 text-center text-xs sm:text-sm text-white/60">
          © {new Date().getFullYear()} Perjési Szabolcs. Minden jog fenntartva.
        </div>
      </div>


  )
}

export default WeatherApp;
