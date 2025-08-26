import { CLOUDY, RAINY, SUNNY } from "../assets/icon";

export default function WeatherCard({ weather }) {
  const { location, date, lower_temperature, upper_temperature, status } = weather;

  const renderIcon = () => {
    switch (status) {
      case "Cloudy": {
        return CLOUDY;
      }
      case "Rainy": {
        return RAINY;
      }
      case "Sunny": {
        return SUNNY;
      }
      default:
        return SUNNY;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md min-h-[300px] w-full">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{location}</h3>
        <p className="text-sm text-gray-600">{formatDate(date)}</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center mb-4">
        <div className="weather-icon">
          {renderIcon()}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">
          {lower_temperature}° - {upper_temperature}°C
        </p>
        <p className="text-sm text-gray-600 capitalize">{status}</p>
      </div>
    </div>
  );
}
