import { useEffect, useState } from "react";
import { getCarparks } from "../service/api";
import {
  getPinnedCarpark,
  getSortingMethod,
  setPinnedCarpark,
} from "../helper/utilities";
import CarparkCard from "../components/CarparksCard";
import { useSearchParams } from "react-router-dom";
import getDistanceFromLatLonInKm from "../helper/geolocation_distance";
import getCurrentLocation from "../helper/getCurrentLocation";

export default function Carparks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [carparks, setCarparks] = useState([]);
  const [focusedCarpark, setFocusedCarpark] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pinnedCarparks, setPinnedCarparks] = useState(
    () => getPinnedCarpark() || []
  );

  // Geolocation
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  async function initCoordinates() {
    try {
      const coords = await getCurrentLocation();
      setLongitude(coords.longitude);
      setLatitude(coords.latitude);

      if (!searchParams.get("latitude") || !searchParams.get("longitude")) {
        setSearchParams({
          longitude: coords.longitude,
          latitude: coords.latitude,
        });
      }
    } catch {
      const latParam = searchParams.get("latitude");
      const lonParam = searchParams.get("longitude");

      if (latParam && lonParam) {
        setLatitude(latParam);
        setLongitude(lonParam);
      } else {
        setLatitude(defaultLatitude);
        setLongitude(defaultLongitude);

        setSearchParams({
          latitude: defaultLatitude,
          longitude: defaultLongitude,
        });
      }
    }
  }

  useEffect(() => {
    initCoordinates();
  }, []);

  useEffect(() => {
    if (longitude === null || latitude === null) return;
    fetchCarparks();
  }, [pinnedCarparks, longitude, latitude]);

  async function fetchCarparks() {
    setIsLoading(true);
    try {
      const data = await getCarparks();
      const sortingMethod = getSortingMethod();

      switch (sortingMethod) {
        case "alphabet": {
          data.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case "distance": {
          data.sort((a, b) => {
            const distA = getDistanceFromLatLonInKm(
              latitude,
              longitude,
              a.latitude,
              a.longitude
            );
            const distB = getDistanceFromLatLonInKm(
              latitude,
              longitude,
              b.latitude,
              b.longitude
            );

            console.log(distA);
            console.log(distB);

            return distA - distB;
          });
          break;
        }
        default: {
          data.sort((a, b) => a.name.localeCompare(b.name));
        }
      }

      const pinned = data.filter((carpark) =>
        pinnedCarparks.includes(carpark.name)
      );
      const unpinned = data.filter(
        (carpark) => !pinnedCarparks.includes(carpark.name)
      );

      setCarparks([...pinned, ...unpinned]);
    } catch (error) {
      console.error(error);
      setCarparks([]);
    }
    setIsLoading(false);
  }

  function togglePinned(newPinned) {
    setPinnedCarparks((prev) => {
      const updated = prev.includes(newPinned)
        ? prev.filter((n) => n != newPinned)
        : [...prev, newPinned];
      setPinnedCarpark(updated);
      return updated;
    });
  }

  function handleSetGeolocation(type, value) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      switch (type) {
        case "latitude": {
          params.set("latitude", value);
          setLatitude(value);
          break;
        }
        case "longitude": {
          params.set("longitude", value);
          setLongitude(value);
          break;
        }
      }

      return params;
    });
  }

  const defaultLongitude = 4.846358;
  const defaultLatitude = 45.755051;

  return (
    <section id="carparks">
      {/* Focus carpark view */}
      {focusedCarpark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Carpark Details</h2>
              <button
                onClick={() => setFocusedCarpark(null)}
                className="px-2 py-1 text-xl font-bold rounded hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold">{focusedCarpark.name}</h3>

                <div className="space-y-3">
                  <div className="p-3 rounded bg-gray-50">
                    <p className="text-lg">
                      <span className="font-semibold">Available Spaces:</span>
                    </p>
                    <p className="text-2xl font-bold text-green-600">{focusedCarpark.availableSpaces}</p>
                  </div>

                  {latitude && longitude && (
                    <div className="p-3 rounded bg-gray-50">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Distance:</span>{' '}
                        {getDistanceFromLatLonInKm(
                          latitude,
                          longitude,
                          focusedCarpark.latitude,
                          focusedCarpark.longitude
                        ).toFixed(2)} km away
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinned(focusedCarpark.name);
                    }}
                    className={`w-full py-3 text-white rounded-lg font-medium ${
                      pinnedCarparks.includes(focusedCarpark.name)
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-sky-500 hover:bg-sky-600"
                    }`}
                  >
                    {pinnedCarparks.includes(focusedCarpark.name) ? "Unpin from Top" : "Pin to Top"}
                  </button>

                  <button
                    onClick={() => setFocusedCarpark(null)}
                    className="w-full py-3 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-12">
        <div className="flex flex-col gap-2">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            type="text"
            onChange={(e) => handleSetGeolocation("latitude", e.target.value)}
            value={latitude || ""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="longitude">longitude</label>
          <input
            id="longitude"
            type="text"
            onChange={(e) => handleSetGeolocation("longitude", e.target.value)}
            value={longitude || ""}
          />
        </div>
      </div>

      {/* Carpark list */}
      <ul className="flex flex-col gap-8">
        {carparks.length > 0 &&
          carparks.map((carpark) => (
            <li
              key={`${carpark.name}`}
              className="flex justify-center w-full"
            >
              <CarparkCard
                isPinned={pinnedCarparks.includes(carpark.name)}
                carpark={carpark}
                togglePinned={togglePinned}
                onCardClick={() => setFocusedCarpark(carpark)}
                userLocation={{ latitude, longitude }}
              />
            </li>
          ))}
      </ul>
      {isLoading ? <p className="text-center">loading...</p> : ""}
    </section>
  );
}
