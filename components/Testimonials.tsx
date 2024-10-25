"use client";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample testimonials with demo authors and avatars
const testimonials = [
  {
    name: 'John Doe',
    review: 'This app made trip planning a breeze! Highly recommended.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    name: 'Jane Smith',
    review: 'The best app for planning vacations. I loved every bit of it.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Sarah Lee',
    review: 'Easy-to-use and helped me save a lot of time planning.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
];

const Testimonials: React.FC = () => {
  const settings = {
    dots: false, // Remove dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true, // Enable arrows
    prevArrow: <CustomArrow direction="left" />, // Custom left arrow
    nextArrow: <CustomArrow direction="right" />, // Custom right arrow
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 font-kanit">What Our Users Say</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-white shadow-lg rounded-lg text-center relative overflow-hidden">
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}'s avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
              />
              <p className="mb-4 italic text-gray-600 text-lg">"{testimonial.review}"</p>
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Custom arrow component
const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      className={`absolute top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg transition duration-300 ease-in-out 
        ${direction === "left" ? "left-5" : "right-5"} hover:bg-gray-200`}
      onClick={onClick}
      aria-label={`Slide ${direction}`}
    >
      {direction === "left" ? '<' : '>'} {/* Simple text for arrows */}
    </button>
  );
};

export default Testimonials;
