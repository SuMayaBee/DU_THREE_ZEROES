// components/PopularDestinations.tsx
"use client"
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import FeatureCard from "./FeatureCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const destinations = [
  { name: "Paris", image: "https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/paris" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/canada" },
  { name: "New York", image: "https://plus.unsplash.com/premium_photo-1681803531285-75db948035d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/newyork" },
  { name: "Paris", image: "https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/paris" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/canada" },
  { name: "New York", image: "https://plus.unsplash.com/premium_photo-1681803531285-75db948035d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/newyork" },
];

const PopularDestinations: React.FC = () => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay:true,
    autoplaySpeed:1000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16 bg-white">
      <div className="px-3 mx-auto">
        <h2 className="font-kanit text-center font-bold text-5xl mb-16">
          Popular Destinations
        </h2>
        <div className="pb-16 mx-auto">
          <Slider {...settings}>
            {destinations.map((dest, index) => (
              <FeatureCard key={index} img={dest.image} countryName={dest.name} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
