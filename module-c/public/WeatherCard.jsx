import { CLOUDY_ICON, RAINY_ICON, SUNNY_ICON } from "./Icons";

export default function WeatherCard({ weather }) {
  const { location, date, status, lower_temperature, upper_temperature } =
    weather;

  const render = () => {
    switch (status.toLowerCase()) {
      case "cloudy": {
        console.log("clondy");
        return CLOUDY_ICON;
      }
      case "rainy": {
        return RAINY_ICON;
      }
      case "sunny": {
        return SUNNY_ICON;
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-800">
      <h2 className="text-3xl text-center font-bold mb-2">{location}</h2>
      <p className="text-center font-bold">{date}</p>
      {render()}
      <p className="text-gray-500 mb-4 text-center font-bold text-lg">
        {lower_temperature}-{upper_temperature}C
      </p>
    </div>
  );
}
