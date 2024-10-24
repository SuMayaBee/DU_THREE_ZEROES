"use client";
import React from "react";
import styled from "styled-components";
import { FaMapMarkedAlt, FaPlane, FaBook } from "react-icons/fa";

const Features = () => {
  return (
    <StyledWrapper>
      <h2 className="heading font-kanit">Our Travel Features</h2>
      <div className="cards">
        <div className="card destinations">
          <div className="icon-wrapper">
            <FaMapMarkedAlt className="icon" />
          </div>
          <p className="tip">Destinations</p>
          <p className="second-text">Explore the world</p>
        </div>
        <div className="card guides">
          <div className="icon-wrapper">
            <FaBook className="icon" />
          </div>
          <p className="tip">Travel Guides</p>
          <p className="second-text">Plan your trip</p>
        </div>
        <div className="card deals">
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
  padding: 20px;

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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    position: relative;
    overflow: hidden;
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

  /* Card Hover Effects */
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

  /* Blur effect on non-hovered sibling cards */
  .card:hover {
    z-index: 1; /* Bring hovered card to the front */
  }

  .cards .card:hover ~ .card,
  .cards .card:hover ~ .card ~ .card {
    filter: blur(5px);
    transform: scale(0.95);
  }

  /* Remove blur when the card is not hovered */
  .card:not(:hover) {
    filter: none;
    transform: none;
  }
`;

export default Features;
