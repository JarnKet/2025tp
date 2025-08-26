import { useEffect, useState } from "react";
import { getWeather } from "../service/api";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [weathers, setWeather] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeather();
      setWeather(data);
    }

    fetchWeather();
  }, []);

  return (
    <section id="weather">
      <div className="overflow-hidden">
        <ul className="flex max-w-[400px] mx-auto overflow-x-scroll snap-x snap-mandatory">
          {weathers.length &&
            weathers.map((weather) => (
              <li
                key={weather.date}
                className="w-full grow shrink-0 snap-center snap-always"
              >
                <WeatherCard weather={weather} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
