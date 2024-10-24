"use client";
import React, { useState } from 'react';

// Define the hotel data interface
interface Hotel {
  hotel_name: string;
  hotel_name_trans?: string;
  latitude?: number;
  longitude?: number;
  main_photo_url?: string;
  review_score?: number;
  review_score_word?: string;
  min_total_price?: number;
  currencycode?: string;
}

const HotelSearch: React.FC = () => {
  const [place, setPlace] = useState(''); // Input for place
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [departureDate, setDepartureDate] = useState(() => {
    const depDate = new Date();
    depDate.setDate(depDate.getDate() + 5); // Default to 5 days later
    return depDate.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState<number>(1); // Number of adults
  const [roomQty, setRoomQty] = useState<number>(1); // Number of rooms
  const [priceMin, setPriceMin] = useState<number>(0); // Minimum price
  const [priceMax, setPriceMax] = useState<number>(10000); // Maximum price
  const [hotels, setHotels] = useState<Hotel[]>([]); // Array to store hotel data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch latitude and longitude from the OpenCage API
  const fetchLatLngFromPlace = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear errors

    const openCageApiKey = 'a6b5c7a0d65d4c148283a0b380e51fd6'; // Your OpenCage API key
    const encodedPlace = encodeURIComponent(place); // Encode the place input
    const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedPlace}&key=${openCageApiKey}`;

    try {
      const response = await fetch(openCageUrl);
      const data = await response.json();

      // If valid data is returned, set latitude and longitude
      if (data.results && data.results.length > 0) {
        const result = data.results[0].geometry;
        setLatitude(result.lat);
        setLongitude(result.lng);

        // Call the Booking.com API with the retrieved coordinates
        fetchHotelsFromBooking(result.lat, result.lng);
      } else {
        setError('No results found for the entered place.');
      }
    } catch (err) {
      setError('Error fetching location data from OpenCage.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch hotel data from Booking.com using latitude and longitude
  const fetchHotelsFromBooking = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    const bookingApiKey = '8443cd0260msh01b51cfedf196a0p1453e5jsn137824756510'; // Your Booking.com API key

    const bookingUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates?latitude=${lat}&longitude=${lng}&arrival_date=${arrivalDate}&departure_date=${departureDate}&radius=300&adults=${adults}&room_qty=${roomQty}&price_min=${priceMin}&price_max=${priceMax}&units=metric&page_number=1&temperature_unit=c&languagecode=en-us&currency_code=EUR`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': bookingApiKey,
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(bookingUrl, options);
      const data = await response.json();

      // Assuming `data.data.result` contains an array of hotel details
      const hotels = data.data.result || [];
      setHotels(hotels); // Update the state with fetched hotels
    } catch (error) {
      setError('Error fetching hotel data from Booking.com.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (place.trim() === '') {
      setError('Please enter a place.');
      return;
    }
    fetchLatLngFromPlace(); // Fetch lat/lng based on the place input
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Search Hotels by Place</h1>

      {/* Input field for place */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place">
          Enter Place:
        </label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="E.g., Berlin, New York, etc."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Input fields for arrival and departure dates */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrivalDate">
          Arrival Date:
        </label>
        <input
          type="date"
          id="arrivalDate"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureDate">
          Departure Date:
        </label>
        <input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Input fields for adults and room quantity */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adults">
          Number of Adults:
        </label>
        <input
          type="number"
          id="adults"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomQty">
          Number of Rooms:
        </label>
        <input
          type="number"
          id="roomQty"
          value={roomQty}
          onChange={(e) => setRoomQty(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Input fields for price range */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceMin">
          Minimum Price:
        </label>
        <input
          type="number"
          id="priceMin"
          value={priceMin}
          onChange={(e) => setPriceMin(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceMax">
          Maximum Price:
        </label>
        <input
          type="number"
          id="priceMax"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
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

      {/* Display hotel data */}
      {Array.isArray(hotels) && hotels.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">Hotel Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">
                  {hotel.hotel_name_trans || hotel.hotel_name || 'No Name Available'}
                </h3>
                {/* Display the main photo */}
                {hotel.main_photo_url && (
                  <img
                    src={hotel.main_photo_url}
                    alt={hotel.hotel_name_trans || hotel.hotel_name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700">Review Score: {hotel.review_score || 'N/A'}</p>
                <p className="text-gray-700">Review Words: {hotel.review_score_word || 'N/A'}</p>
                <p className="text-gray-700">
                  Price: {hotel.min_total_price} {hotel.currencycode || ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
