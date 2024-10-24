"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "./StartedButton";

const Banner: React.FC = () => {
  const circleRefs = useRef<SVGCircleElement[]>([]); // Ref for circle elements

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the banner's bounding box
      const bannerRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - bannerRect.left; // Mouse X position relative to banner
      const mouseY = e.clientY - bannerRect.top;  // Mouse Y position relative to banner

      // Move the circles based on mouse position
      circleRefs.current.forEach((circle, index) => {
        const movementFactor = (index + 1) * 0.1; // Vary movement factor for parallax effect
        const newX = (mouseX - bannerRect.width / 2) * movementFactor;
        const newY = (mouseY - bannerRect.height / 2) * movementFactor;

        gsap.to(circle, {
          x: newX, // Smoothly move the circle on the x-axis
          y: newY, // Smoothly move the circle on the y-axis
          duration: 1.5, // Smoother and slower animation duration
          ease: "power3.out", // Easing function for smooth movement
        });
      });
    };

    const bannerElement = document.getElementById("banner");
    bannerElement?.addEventListener("mousemove", handleMouseMove);

    return () => {
      bannerElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="banner"
      className="relative bg-[#fcfbf3] text-black p-20 rounded-lg overflow-hidden h-screen flex items-center justify-center"
    >
      {/* Background Circles */}
      <CircleBackground circleRefs={circleRefs} />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h1 className="font-kanit text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          Be a Traveler <br />
          Not a Tourist!
        </h1>
        <p className="mb-6 text-lg md:text-xl">
          Discover new destinations and create unforgettable memories with our
          easy-to-use trip planning tools.
        </p>
        <Button />
      </div>
    </div>
  );
};

interface CircleBackgroundProps {
  circleRefs: React.RefObject<SVGCircleElement[]>;
}

const CircleBackground: React.FC<CircleBackgroundProps> = ({ circleRefs }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#ff8644">
        {/* Assign refs to each circle */}
        <circle ref={el => (circleRefs.current[0] = el)} r="147" cx="186" cy="554"></circle>
        <circle ref={el => (circleRefs.current[1] = el)} r="65" cx="454" cy="71"></circle>
        <circle ref={el => (circleRefs.current[2] = el)} r="87" cx="768" cy="585"></circle>
      </g>
    </svg>
  );
};

export default Banner;
