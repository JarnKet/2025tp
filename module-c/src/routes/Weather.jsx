import { useEffect, useState } from "react";
import { getWeather } from "../service/api";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [weathers, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        const data = await getWeather();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <section id="weather" className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-600">Loading weather forecast...</p>
      </section>
    );
  }

  return (
    <section id="weather" className="py-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-center">7-Day Weather Forecast</h1>
        <p className="text-sm text-gray-600 text-center mt-1">
          Swipe left or right to see more days
        </p>
      </div>
      
      <div className="overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4">
          {weathers.length > 0 ? (
            weathers.map((weather, index) => (
              <div
                key={weather.date || index}
                className="flex-none w-80 snap-center snap-always"
              >
                <WeatherCard weather={weather} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8">
              <p className="text-gray-500">No weather data available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
