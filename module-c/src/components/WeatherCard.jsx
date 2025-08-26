import { CLOUDY, RAINY, SUNNY } from "../assets/icon";

export default function WeatherCard({ weather }) {
  console.log(weather);
  const { location, date, lower_temperature, upper_temperature } = weather;

  const renderIcon = () => {
    switch (weather.status) {
      case "Cloudy": {
        return CLOUDY;
      }
      case "Rainy": {
        return RAINY;
      }
      case "Sunny": {
        return SUNNY;
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-zinc-400 rounded-2xl shadow-lg border border-gray-200 text-gray-800">
      <h2 className="text-3xl text-center font-bold mb-2">{location}</h2>
      <p className="text-center">{date}</p>
      {renderIcon()}
      <p className="text-gray-500 mb-4 text-center font-bold text-lg">
        {lower_temperature}-{upper_temperature}C
      </p>
    </div>
  );
}
