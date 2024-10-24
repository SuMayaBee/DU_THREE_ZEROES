"use client";
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-left">
        <h1 className="text-4xl font-bold text-left mb-6">About Us</h1>
        <h2 className="text-2xl font-semibold mb-4">Explore All Corners of The World With Us</h2>
          <p className="text-sm mb-2">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
          <p className="text-lg mb-4">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
        </div>
        <div className="flex space-y-2">
          <img
            src="https://preview.colorlib.com/theme/passport/images/about_1.jpg" // Top image
            alt="About Us Image 1"
            className="w-64 h-auto rounded shadow-lg" // Adjust width
          />
          <img
            src="https://preview.colorlib.com/theme/passport/images/about_2.jpg" // Bottom image
            alt="About Us Image 2"
            className="w-64 -mt-5 ms-2 h-auto rounded shadow-lg" // Adjust width
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
