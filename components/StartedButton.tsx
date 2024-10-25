'use client';
import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="shadow__btn">Get Started</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .shadow__btn {
    padding: 10px 20px;
    border: none;
    font-size: 17px;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
  }

  .shadow__btn {
    background: #FF5733; /* Reddish-orange color */
    box-shadow: 0 0 25px #FF5733; /* Reddish-orange shadow */
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px #FF5733,
                0 0 25px #FF5733,
                0 0 50px #FF5733,
                0 0 100px #FF5733;
  }
`;

export default Button;
