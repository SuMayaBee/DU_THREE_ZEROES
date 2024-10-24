"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Set the GraphHopper API Key (must be present in env variables)
const graphHopperApiKey = process.env.NEXT_PUBLIC_GRAPHHOPPER_API_KEY!;

// Fix for missing marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define the GeocodeResponse type to match the expected API response
interface GeocodeResponse {
  hits: Array<{
    point: {
      lat: number;
      lng: number;
    };
  }>;
}

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null); // Coordinates state [lat, lng]

  // Function to handle searching the place using GraphHopper Geocoding API
  const handleSearch = async (): Promise<void> => {
    if (!searchQuery) return;

    try {
      // Call GraphHopper Geocoding API
      const response = await axios.get<GeocodeResponse>(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
          searchQuery
        )}&key=${graphHopperApiKey}`
      );

      if (response.data.hits.length > 0) {
        const { lat, lng } = response.data.hits[0].point;
        setCoordinates([lat, lng]); // Set the coordinates from the API response
      } else {
        alert('Place not found!');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error fetching location.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
          className="w-96 p-3 pr-20 text-lg border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1 h-10 px-5 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ease-in-out duration-300"
        >
          Search
        </button>
      </div>

      {/* Map Display */}
      {coordinates && (
        <MapContainer
          center={coordinates} // Directly use coordinates
          zoom={13}
          className="w-[800px] h-[500px] border border-gray-300 shadow-lg rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>
              {searchQuery} <br /> Latitude: {coordinates[0]}, Longitude: {coordinates[1]}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default SearchBox;
