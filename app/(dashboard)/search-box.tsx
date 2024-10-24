"use client";
import React, { useState } from "react";
import InputField from "./dashboard/InputField"; // Import the InputField component
import { FaSearch, FaStar } from "react-icons/fa";

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
  const [place, setPlace] = useState("");
  const [arrivalDate, setArrivalDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [departureDate, setDepartureDate] = useState(() => {
    const depDate = new Date();
    depDate.setDate(depDate.getDate() + 5);
    return depDate.toISOString().split("T")[0];
  });
  const [adults, setAdults] = useState<number>(1);
  const [roomQty, setRoomQty] = useState<number>(1);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldMapTrigger, setShouldMapTrigger] = useState<boolean | null>(
    null
  );

  // Individual error states
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [arrivalDateError, setArrivalDateError] = useState<string | null>(null);
  const [departureDateError, setDepartureDateError] = useState<string | null>(
    null
  );
  const [adultsError, setAdultsError] = useState<string | null>(null);
  const [roomQtyError, setRoomQtyError] = useState<string | null>(null);
  const [priceMinError, setPriceMinError] = useState<string | null>(null);
  const [priceMaxError, setPriceMaxError] = useState<string | null>(null);

  const SkeletonLoader = () => (
    <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const fetchLatLngFromPlace = async () => {
    setLoading(true);
    setError(null);

    // Reset error messages
    resetErrors();

    const openCageApiKey = "a6b5c7a0d65d4c148283a0b380e51fd6";
    const encodedPlace = encodeURIComponent(place);
    const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedPlace}&key=${openCageApiKey}`;

    try {
      const response = await fetch(openCageUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0].geometry;
        fetchHotelsFromBooking(result.lat, result.lng);
      } else {
        setError("No results found for the entered place.");
      }
    } catch (err) {
      setError("Error fetching location data from OpenCage.");
    } finally {
      setLoading(false);
      setShouldMapTrigger(true);
    }
  };

  const fetchHotelsFromBooking = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    const bookingApiKey = "f7be92aabdmsh9085d6fc69c508ep196301jsn01caa1c80f1f";

    const bookingUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates?latitude=${lat}&longitude=${lng}&arrival_date=${arrivalDate}&departure_date=${departureDate}&radius=300&adults=${adults}&room_qty=${roomQty}&price_min=${priceMin}&price_max=${priceMax}&units=metric&page_number=1&temperature_unit=c&languagecode=en-us&currency_code=EUR`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": bookingApiKey,
        "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(bookingUrl, options);
      const data = await response.json();
      const hotels = data.data.result || [];
      setHotels(hotels);
    } catch (error) {
      setError("Error fetching hotel data from Booking.com.");
    } finally {
      setLoading(false);
      setShouldMapTrigger(true);
    }
  };

  const resetErrors = () => {
    setPlaceError(null);
    setArrivalDateError(null);
    setDepartureDateError(null);
    setAdultsError(null);
    setRoomQtyError(null);
    setPriceMinError(null);
    setPriceMaxError(null);
  };

  const handleSearch = () => {
    resetErrors(); // Clear previous error messages

    // Validation checks
    let hasError = false;
    if (place.trim() === "") {
      setPlaceError("Please enter a place.");
      hasError = true;
    }
    if (!arrivalDate) {
      setArrivalDateError("Please select an arrival date.");
      hasError = true;
    }
    if (!departureDate) {
      setDepartureDateError("Please select a departure date.");
      hasError = true;
    }
    if (adults <= 0) {
      setAdultsError("Please enter a valid number of adults.");
      hasError = true;
    }
    if (roomQty <= 0) {
      setRoomQtyError("Please enter a valid number of rooms.");
      hasError = true;
    }
    if (priceMin < 0) {
      setPriceMinError("Minimum price cannot be negative.");
      hasError = true;
    }
    if (priceMax < 0) {
      setPriceMaxError("Maximum price cannot be negative.");
      hasError = true;
    }
    if (priceMin > priceMax) {
      setPriceMaxError(
        "Maximum price must be greater than or equal to minimum price."
      );
      hasError = true;
    }

    if (hasError) return; // If there are errors, prevent further execution

    fetchLatLngFromPlace();
  };

  return (
    <div className="container mb-5 mx-auto p-6">
      <h1 className="text-4xl font-bold text-left font-kanit mb-6">
        Search Hotels by Place
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
        <InputField
          label="Enter Place:"
          id="place"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="E.g., Berlin, New York, etc."
          error={placeError} // Pass the error state
        />
        <InputField
          label="Arrival Date:"
          id="arrivalDate"
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          error={arrivalDateError} // Pass the error state
        />
        <InputField
          label="Departure Date:"
          id="departureDate"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          error={departureDateError} // Pass the error state
        />
        <InputField
          label="Number of Adults:"
          id="adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          error={adultsError} // Pass the error state
        />
        <InputField
          label="Number of Rooms:"
          id="roomQty"
          type="number"
          value={roomQty}
          onChange={(e) => setRoomQty(Number(e.target.value))}
          error={roomQtyError} // Pass the error state
        />
        <InputField
          label="Minimum Price:"
          id="priceMin"
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(Number(e.target.value))}
          error={priceMinError} // Pass the error state
        />
        <InputField
          label="Maximum Price:"
          id="priceMax"
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          error={priceMaxError} // Pass the error state
        />
      </div>

      <button
        className="bg-[#FF5733] hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 flex items-center justify-center shadow-lg transition duration-200"
        onClick={handleSearch}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-red-500 rounded-full mr-2"></div>
            Loading...
          </div>
        ) : (
          <>
            <FaSearch className="mr-2" />
            Search Hotels
          </>
        )}
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {loading && (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}
      {!(hotels.length < 1) && (
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 p-3">
          {/* Left side: Hotel Cards */}
          <div className="grid grid-cols-1 gap-3 max-h-[100vh] overflow-scroll">
            {hotels.map((hotel) => (
              <div
                key={hotel.hotel_name}
                className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-kanit mb-2 font-semibold">
                  {hotel.hotel_name}
                </h2>
                {hotel.main_photo_url && (
                  <img
                    src={hotel.main_photo_url}
                    alt={hotel.hotel_name}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex gap-1 items-center">
                  <FaStar />{" "}
                  <p className="text-gray-600 font-bold">
                    <span>Score:</span> {hotel.review_score} 
                  </p> 
                </div>
               
                  <p className="my-1 text-green-800 font-semibold">
                    <span>Grade:</span> ({hotel.review_score_word})</p>
                <p className=" mt-1 text-red-500 font-semibold">
                  Price: {hotel.min_total_price} {hotel.currencycode}
                </p>

              </div>
            ))}
          </div>

          {/* Right side: Google Map */}
          {shouldMapTrigger && (
            <div className="flex justify-center items-center col-span-2">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.509979878247!2d-122.42200358468175!3d37.77492957975968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809b4a9e1687%3A0x6e6e3af0e5f2ab36!2sUnion%20Square%2C%20San%20Francisco%2C%20CA%2094102%2C%20USA!5e0!3m2!1sen!2sin!4v1690529679566!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0 rounded-lg shadow-sm w-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelSearch;
