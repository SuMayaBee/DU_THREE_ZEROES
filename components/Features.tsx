"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FaMapMarkedAlt, FaPlane, FaBook } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin for GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Features = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // GSAP animation for card entry
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 80%",
        end: "bottom 20%",
      },
    });
  }, []);

  // GSAP hover effect function
  const handleHover = (el: HTMLDivElement, reverse = false) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(el, {
      scale: 1.05, // Scale up on hover
      rotate: 5, // Small rotation for a fun effect
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)", // Shadow effect
      backgroundColor: "#f0f0f0", // Change background on hover
      duration: 0.5,
      ease: "power2.out",
    });

    if (reverse) {
      tl.reverse(); // Reverse the effect when the hover ends
    } else {
      tl.play(); // Play the hover animation
    }
  };

  return (
    <StyledWrapper className="py-16">
      <h2 className="heading font-kanit">Our Travel Features</h2>
      <div className="cards">
        <div
          className="card destinations"
          ref={(el) => (cardsRef.current[0] = el!)}
          onMouseEnter={() => handleHover(cardsRef.current[0])}
          onMouseLeave={() => handleHover(cardsRef.current[0], true)}
        >
          <div className="icon-wrapper">
            <FaMapMarkedAlt className="icon" />
          </div>
          <p className="tip">Destinations</p>
          <p className="second-text">Explore the world</p>
        </div>
        <div
          className="card guides"
          ref={(el) => (cardsRef.current[1] = el!)}
          onMouseEnter={() => handleHover(cardsRef.current[1])}
          onMouseLeave={() => handleHover(cardsRef.current[1], true)}
        >
          <div className="icon-wrapper">
            <FaBook className="icon" />
          </div>
          <p className="tip">Travel Guides</p>
          <p className="second-text">Plan your trip</p>
        </div>
        <div
          className="card deals"
          ref={(el) => (cardsRef.current[2] = el!)}
          onMouseEnter={() => handleHover(cardsRef.current[2])}
          onMouseLeave={() => handleHover(cardsRef.current[2], true)}
        >
          <div className="icon-wrapper">
            <FaPlane className="icon" />
          </div>
          <p className="tip">Flight Deals</p>
          <p className="second-text">Get the best offers</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center;

  /* Header Styling */
  .heading {
    font-size: 2.5em;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
  }

  .cards {
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    margin-top: 40px;
  }

  .cards .card {
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    width: 280px;
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  /* Icon wrapper with a circular background */
  .icon-wrapper {
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    padding: 15px;
    border-radius: 50%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 15px rgba(255, 126, 95, 0.4);
  }

  .icon {
    font-size: 2.5em;
    color: white;
  }

  /* Card Titles */
  .tip {
    font-size: 1.3em;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  /* Subtext */
  .second-text {
    font-size: 1em;
    color: #777;
    margin-bottom: 15px;
  }

  /* Specific card styles */
  .destinations {
    border-top: 4px solid #1e90ff;
  }

  .guides {
    border-top: 4px solid #ffcc00;
  }

  .deals {
    border-top: 4px solid #ff4500;
  }
`;

export default Features;
