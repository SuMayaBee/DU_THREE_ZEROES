"use client";
import React, { useState } from 'react';

interface Airline {
  name: string;
  logoUrl: string;
  iataCode: string;
  count: number;
  minPrice: {
    currencyCode: string;
    units: number;
    nanos: number;
  };
}

interface FlightOffer {
  priceBreakdown: {
    total: {
      amount: number;
      unit: string;
    };
  };
  segments: {
    totalTime: string;
  }[];
}

const FlightSearch: React.FC = () => {
  const [formId, setFormId] = useState('');
  const [toId, setToId] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [sort, setSort] = useState('CHEAPEST');
  const [cabinClass, setCabinClass] = useState('ECONOMY');
  const [loading, setLoading] = useState(false);
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);

    const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${formId}&toId=${toId}&departDate=${departDate}&returnDate=${returnDate}&pageNo=1&adults=${adults}&sort=${sort}&cabinClass=${cabinClass}&currency_code=AED`;

    const options = {
      method: 'GET',
      headers: {
		'x-rapidapi-key': 'a4ce2225d0msh1e57e39b70443b1p1fda5djsn79068af0d356',
		'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	}
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Data: ", data); // Log the entire response for inspection

      // Extract flight offers
      if (data.data.flightOffers && data.data.flightOffers.length > 0) {
        setFlightOffers(data.data.flightOffers); // Set flight offers
      } else {
        setError('No flight offers found.');
      }

      // Extract airline information
      if (data.data.aggregation && data.data.aggregation.airlines.length > 0) {
        setAirlines(data.data.aggregation.airlines); // Set airlines
      } else {
        setError('No airline information found.');
      }
    } catch (error) {
      setError('Error fetching flight data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!formId || !toId || !departDate || !returnDate) {
      setError('Please fill in all the fields.');
      return;
    }
    fetchFlights();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Search Flights</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formId">
          From (Airport Code):
        </label>
        <input
          type="text"
          id="formId"
          value={formId}
          onChange={(e) => setFormId(e.target.value)}
          placeholder="E.g., BOM.AIRPORT"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toId">
          To (Airport Code):
        </label>
        <input
          type="text"
          id="toId"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          placeholder="E.g., DEL.AIRPORT"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departDate">
          Departure Date:
        </label>
        <input
          type="date"
          id="departDate"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnDate">
          Return Date:
        </label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sort">
          Sort By:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="BEST">Best</option>
          <option value="CHEAPEST">Cheapest</option>
          <option value="FASTEST">Fastest</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cabinClass">
          Cabin Class:
        </label>
        <select
          id="cabinClass"
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First Class</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Display flight offers
      {flightOffers.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">Flight Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flightOffers.map((flight, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Flight Offer {index + 1}</h3>
                <p className="text-gray-700">
                  Total Price: {flight.priceBreakdown.total.amount} {flight.priceBreakdown.total.unit}
                </p>
                <p className="text-gray-700">
                  Total Time: {flight.segments[0].totalTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Display airlines */}
      {airlines.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">Airline Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airlines.map((airline, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{airline.name}</h3>
                <img
                  src={airline.logoUrl}
                  alt={`${airline.name} Logo`}
                  className="w-full h-12 object-contain mb-4"
                />
                <p className="text-gray-700">IATA Code: {airline.iataCode}</p>
                <p className="text-gray-700">
                  Minimum Price: {airline.minPrice.units}.{(airline.minPrice.nanos / 1e9).toFixed(3)} {airline.minPrice.currencyCode}
                </p>
                <p className="text-gray-700">Available Seats: {airline.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
