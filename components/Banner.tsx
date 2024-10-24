import React from 'react';
import Button from './StartedButton';

const Banner: React.FC = () => {
  return (
    <div className="relative bg-[#fcfbf3] text-black p-20 rounded-lg ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center" 
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }} 
      />
      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Heading with Kanit font and larger size */}
        <h1 className="font-kanit text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          Be a Traveler <br />
          Not a Tourist!
        </h1>
        <p className="mb-6 text-lg md:text-xl">
          Discover new destinations and create unforgettable memories with our easy-to-use trip planning tools.
        </p>
        <Button />
      </div>
    </div>
  );
};

export default Banner;
