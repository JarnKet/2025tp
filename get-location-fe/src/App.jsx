import { useState } from "react";

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  return (
    <div className="p-6 font-sans text-center">
      <h1 className="mb-4 text-2xl font-bold">🌍 Get Current Location</h1>
      <button
        onClick={getLocation}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Get My Location
      </button>

      {location && (
        <p className="mt-4 text-lg">
          📍 Latitude: {location.lat}, Longitude: {location.lon}
        </p>
      )}

      {error && <p className="mt-4 text-red-500">⚠️ {error}</p>}
    </div>
  );
}

export default App;
