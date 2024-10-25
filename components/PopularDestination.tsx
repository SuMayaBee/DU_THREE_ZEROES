"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { name: "Paris", image: "https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/paris" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/canada" },
  { name: "New York", image: "https://plus.unsplash.com/premium_photo-1681803531285-75db948035d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/newyork" },
  { name: "Paris", image: "https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/paris" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/canada" },
  { name: "New York", image: "https://plus.unsplash.com/premium_photo-1681803531285-75db948035d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "/destination/newyork" },
  // Add more destinations as needed
];

const PopularDestinations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current;

    gsap.to(sections, {
      xPercent: -100 * Math.ceil((sections.length / 3) - 1), // Scroll for groups of 3
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / Math.ceil((sections.length / 3) - 1), // Snap to groups of 3
        end: () => `+=${containerRef.current?.offsetWidth}`,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="container bg-white overflow-hidden py-16 ">
      <h2 className="font-kanit text-center font-bold text-5xl mb-16">
        Popular Destinations
      </h2>

      <div className="flex ">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="panel w-1/3 flex-shrink-0" // Adjust width to 1/3 for 3 items in a row
            ref={(el) => (sectionsRef.current[index] = el!)}
          >
            <FeatureCard img={dest.image} countryName={dest.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
