"use client";
import React, { useState } from 'react';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search logic here
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here..."
          className="w-96 p-3 pr-20 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1 h-10 px-5 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ease-in-out duration-300 glow-effect"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
