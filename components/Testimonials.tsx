// components/Testimonials.tsx
"use client";
import React from 'react';

const testimonials = [
  { name: 'John Doe', review: 'This app made trip planning a breeze! Highly recommended.' },
  { name: 'Jane Smith', review: 'The best app for planning vacations. I loved every bit of it.' },
  { name: 'Sarah Lee', review: 'Easy-to-use and helped me save a lot of time planning.' },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 shadow-lg rounded-lg text-center">
            <p className="mb-4 italic">"{testimonial.review}"</p>
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
