// components/HowItWorks.tsx
import React from 'react';

const steps = [
  { step: 'Choose a Destination', description: 'Select your favorite travel location.' },
  { step: 'Plan Your Itinerary', description: 'Customize your trip plan with activities.' },
  { step: 'Book Accommodations', description: 'Easily find and book your stay.' },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
