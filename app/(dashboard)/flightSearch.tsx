"use client";
import React, { useState } from 'react';
import InputField from './dashboard/InputField'; // Adjust the import path as necessary
import SelectField from './SelectField';
import { FaSearch } from 'react-icons/fa';

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
      console.log("Data: ", data);

      if (data.data.flightOffers && data.data.flightOffers.length > 0) {
        setFlightOffers(data.data.flightOffers);
      } else {
        setError('No flight offers found.');
      }

      if (data.data.aggregation && data.data.aggregation.airlines.length > 0) {
        setAirlines(data.data.aggregation.airlines);
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
      <h1 className="text-4xl font-bold text-left mb-6 font-kanit">Search Flights</h1>

      <div className="grid grid-cols-7 gap-3 mb-4">
        <InputField
          label="From (Airport Code)"
          id="formId"
          type="text"
          value={formId}
          onChange={(e) => setFormId(e.target.value)}
          placeholder="E.g., BOM.AIRPORT"
          error={formId ? null : error}
        />

        <InputField
          label="To (Airport Code)"
          id="toId"
          type="text"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          placeholder="E.g., DEL.AIRPORT"
          error={toId ? null : error}
        />

        <InputField
          label="Departure Date"
          id="departDate"
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          error={departDate ? null : error}
        />

        <InputField
          label="Return Date"
          id="returnDate"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          error={returnDate ? null : error}
        />

        <InputField
          label="Number of Adults"
          id="adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          min={1}
          error={adults > 0 ? null : error}
        />
      

     
        <SelectField
          label="Sort By:"
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            { value: 'BEST', label: 'Best' },
            { value: 'CHEAPEST', label: 'Cheapest' },
            { value: 'FASTEST', label: 'Fastest' },
          ]}
          error={null} // You can set an error message if needed
        />

        <SelectField
          label="Cabin Class:"
          id="cabinClass"
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
          options={[
            { value: 'ECONOMY', label: 'Economy' },
            { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
            { value: 'BUSINESS', label: 'Business' },
            { value: 'FIRST', label: 'First Class' },
          ]}
          error={null} // You can set an error message if needed
        />
    </div>


      <div className="flex justify-center">
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
            Search Flights
          </>
        )}
      </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Display flight offers */}
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
      )}

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
                <p className="text-gray-700">Flight Count: {airline.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
