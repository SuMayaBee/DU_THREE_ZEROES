"use client";
import React, { StrictMode } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";

// Dynamically import the MapContainer with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Define your marker data
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3",
  },
];

// Create a custom icon function if needed
const customIcon = new Icon({
  iconUrl: "/gps(1).png", // Example custom icon
  iconSize: [38, 38],
});

const App: React.FC = () => {
  const lat = 48.8566; // Set your initial center latitude
  const lon = 2.3522; // Set your initial center longitude

  return (
    
    <div className="min-h-screen">
      <main className="w-full h-[90vh] z-1 relative">
        {/* Map Container */}
        <MapContainer
          center={[lat, lon] as LatLngExpression}
          zoom={13}
          className="w-full h-full"
        >
          {/* TileLayer: OpenStreetMap for background tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Loop through markers and display them as Markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode as LatLngExpression}
              icon={customIcon}
            >
              {/* Popup when the marker is clicked */}
              <Popup>
                <div>
                  <p className="text-[18px] font-semibold">Marker Info:</p>
                  <p>{marker.popUp}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
    
  );
};

export default App;
