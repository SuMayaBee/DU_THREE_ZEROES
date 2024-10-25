import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface Hotel {
  lat: number;
  lng: number;
  hotel_name: string;
  main_photo_url?: string;
  review_score?: number;
  review_score_word?: string;
  min_total_price?: number;
  currencycode?: string;
}

interface MapProps {
  hotels: Hotel[];
}



const MapComponent: React.FC<MapProps> = ({ hotels }) => {
  const centerPosition: [number, number] = [hotels[0].lat, hotels[0].lng]; // Center on the first hotel

  return (
    <div className="w-full h-screen">
      <MapContainer
        key={`${centerPosition[0]}-${centerPosition[1]}`}
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Map over hotels and create a marker for each */}
        {hotels.map((hotel, index) => (
          <Marker
            key={index}
            position={[hotel.lat, hotel.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="w-48">
                <h3 className="font-bold text-lg">{hotel.hotel_name}</h3>
                {hotel.main_photo_url && (
                  <img
                    src={hotel.main_photo_url}
                    alt={hotel.hotel_name}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                )}
                <p>
                  <span className="font-semibold">Score:</span>{" "}
                  {hotel.review_score || "N/A"} ({hotel.review_score_word || "N/A"})
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {hotel.min_total_price}{" "}
                  {hotel.currencycode}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
