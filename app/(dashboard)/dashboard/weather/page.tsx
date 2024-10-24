"use client";
import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import InputField from "../InputField";
import { FaSearch } from "react-icons/fa";
import "sweetalert2/dist/sweetalert2.min.css"; // Import the CSS for SweetAlert2


const API_KEY = "40efc1d2374da0d8848db007f252200f"; // Replace with your OpenWeatherMap API key
const BASE_URL = `http://api.openweathermap.org/data/2.5/forecast`;

const WeatherForecastPage: React.FC = () => {
  const [location, setLocation] = useState<string>(""); // For input location
  const [date, setDate] = useState<string>(""); // For input date
  const [error, setError] = useState<string | null>(null); // For error handling
  const [loading, setLoading] = useState<boolean>(false); // To show loading state

  const weatherIcons: { [key: string]: string } = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
  };

  const getWeatherIcon = (condition: string) => {
    return weatherIcons[condition] || "🌤️"; // Default icon if condition is not found
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      });

      const weatherData = response.data;

      // Filter and group forecasts by the selected date
      const filteredForecasts = weatherData?.list.filter((forecast: any) => {
        const forecastDate = dayjs(forecast.dt_txt).format("YYYY-MM-DD");
        return forecastDate === date;
      });

      if (filteredForecasts && filteredForecasts.length > 0) {
        const dayTempAvg =
          filteredForecasts.reduce(
            (sum: number, forecast: any) => sum + forecast.main.temp,
            0
          ) / filteredForecasts.length;
        const weatherCondition = filteredForecasts[0].weather[0].main; // Take the first weather condition for simplicity
        const weatherIcon = getWeatherIcon(weatherCondition);

        // Create a summary for the entire day with animation and icon
        const daySummary = `
          <div style="text-align:center; font-size: 1.2rem;">
            <div style="font-size: 2.5rem;">${weatherIcon}</div>
            <strong className="font-kanit">Date: ${new Date(date).toLocaleDateString()}</strong><br />
            <div>Average Temperature: ${dayTempAvg.toFixed(2)} °C</div>
            <div>Condition: ${weatherCondition}</div>
          </div>
        `;

        // Display the weather data in SweetAlert with stunning design
        Swal.fire({
          title: `Weather Forecast for ${location} on ${date}`,
          html: daySummary,
          icon: "info",
          confirmButtonText: "Close",
          width: "60%",
          background: "#fefefe",
          customClass: {
            popup: "shadow-lg glow-effect", // Add a glow effect
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown", // Fade in animation
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp", // Fade out animation
          },
          backdrop: `
            rgba(0,0,123,0.4)
            url("/weather-animation.gif")
            left top
            no-repeat
          `,
        });
      } else {
        Swal.fire({
          title: "No Data Available",
          text: "No weather data found for the selected date.",
          icon: "warning",
          confirmButtonText: "Close",
        });
      }
    } catch (err) {
      setError(
        "Could not fetch weather data. Please check the location and try again."
      );
      Swal.fire({
        title: "Error",
        text: "Could not fetch weather data. Please check the location and try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-screen-md">
      <h1 className="text-2xl font-bold text-center font-kanit">Weather Outlook for Your Visit</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col mt-5 space-y-4 w-full">
        <div className="grid grid-cols-2 gap-2">
          {/* Location Input */}
          <InputField
            label="Location"
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g., New York)"
            error={error} // Display error if any
          />

          {/* Date Picker Input */}
          <InputField
            label="Select Date"
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select Date"
          />
        </div>
        {/* Submit Button */}
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
              Search Weather
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-5">{error}</p>}
    </div>
  );
};

export default WeatherForecastPage;
