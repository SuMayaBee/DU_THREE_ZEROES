"use client";
import React, { useState } from 'react';

const OpenCageGeocoding: React.FC = () => {
  const [placeName, setPlaceName] = useState(''); // To store the user's input
  const [latitude, setLatitude] = useState<number | null>(null); // To store the latitude
  const [longitude, setLongitude] = useState<number | null>(null); // To store the longitude
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To store errors

  const handleSearch = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    setLatitude(null); // Reset latitude
    setLongitude(null); // Reset longitude

    const apiKey = 'a6b5c7a0d65d4c148283a0b380e51fd6'; // Replace with your OpenCage API key
    const encodedPlaceName = encodeURIComponent(placeName); // URL encode the input
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedPlaceName}&key=${apiKey}`;

    try {
      const response = await fetch(url); // Fetch data from OpenCage API
      const data = await response.json();

      // Check if there are any results
      if (data.results && data.results.length > 0) {
        const result = data.results[0].geometry;
        setLatitude(result.lat); // Set latitude
        setLongitude(result.lng); // Set longitude
      } else {
        setError('No results found for the entered place.'); // Handle no results
      }
    } catch (err) {
      setError('Error fetching location data. Please try again later.'); // Handle fetch errors
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Geocoding with OpenCage</h1>

      {/* Input field for place name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placeName">
          Enter Place Name:
        </label>
        <input
          type="text"
          id="placeName"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="E.g., Berlin, New York, etc."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Display Latitude and Longitude */}
      {latitude !== null && longitude !== null && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p className="text-gray-700">Latitude: {latitude}</p>
          <p className="text-gray-700">Longitude: {longitude}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default OpenCageGeocoding;
