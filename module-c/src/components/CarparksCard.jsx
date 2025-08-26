import getDistanceFromLatLonInKm from '../helper/geolocation_distance';

export default function CarparkCard({ isPinned, carpark, togglePinned, onCardClick, userLocation }) {
  const { name, availableSpaces, latitude, longitude } = carpark;

  const distance = userLocation && userLocation.latitude && userLocation.longitude
    ? getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        latitude,
        longitude
      ).toFixed(2)
    : null;

  return (
    <div
      className="w-full flex justify-between items-center text-start px-4 py-2 border-4 border-solid border-[#333] cursor-pointer hover:bg-gray-50"
      onClick={onCardClick}
    >
      <div>
        <p className="text-4xl font-bold">{name}</p>
        <p className="text-black">Available spaces: {availableSpaces}</p>
        {distance && (
          <p className="text-gray-600 text-sm">Distance: {distance} km</p>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card click
          togglePinned(name);
        }}
        className={`${isPinned ? "bg-red-500" : "bg-sky-500"} px-4 py-2 text-white rounded-lg`}
      >
        {isPinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
}
