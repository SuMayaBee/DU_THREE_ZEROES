"use client";
import React from "react";
import styled from "styled-components";

// Define the type for props
interface FeatureCardProps {
  img: string;
  countryName: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ img, countryName }) => {
  return (
    <StyledWrapper>
     
      <div className="cards">
        <div className="card">
          <img src={img} alt="cardImage" width={"100%"} height={"100%"} />
          <div className="overlay">
            <span className="text">{countryName}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center;
  padding: 20px;

  .heading {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #333;
  }

  .cards {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
  }

  .card {
    position: relative;
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    overflow: hidden;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s, background 0.5s;
  }

  .text {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
  }

  .card:hover {
    transform: scale(1.05);
    border: 1px solid black;
  }

  .card:hover .overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
  }

  .card:hover .text {
    opacity: 1;
    transform: translateY(0);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }


`;

export default FeatureCard;
