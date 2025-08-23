import React from "react";
import styled from "styled-components";

// Define the Loader component with TypeScript
const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loading-container">
        <div className="ground" />
        <div className="skeleton">
          <div className="head">
            <div className="eye left" />
            <div className="eye right" />
            <div className="mouth" />
          </div>
          <div className="body" />
          <div className="arm left" />
          <div className="arm right" />
          <div className="leg left" />
          <div className="leg right" />
        </div>
      </div>
    </StyledWrapper>
  );
};

// Styled components with TypeScript
const StyledWrapper = styled.div`
  .loading-container {
    width: 300px;
    height: 150px;
    position: relative;
    overflow: hidden;
  }

  .ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, transparent, #555, transparent);
    animation: ground-move 2s linear infinite;
  }

  @keyframes ground-move {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .skeleton {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100px;
    height: 80px;
    animation: crawl 2s linear infinite;
  }

  @keyframes crawl {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(300px);
    }
  }

  .head {
    position: absolute;
    top: 0;
    left: 30px;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    animation: head-bob 0.5s ease-in-out infinite alternate;
    box-shadow: inset 0 -2px 0 #ccc;
  }

  @keyframes head-bob {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-5px);
    }
  }

  .eye {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #222;
    border-radius: 50%;
    top: 11px;
  }

  .eye.left {
    left: 10px;
  }
  .eye.right {
    left: 20px;
  }

  .mouth {
    position: absolute;
    width: 12px;
    height: 5px;
    background-color: #222;
    border-radius: 0 0 5px 5px;
    top: 18px;
    left: 11px;
    animation: mouth-talk 0.5s ease-in-out infinite alternate;
  }

  @keyframes mouth-talk {
    0% {
      height: 3px;
    }
    100% {
      height: 6px;
    }
  }

  .body {
    position: absolute;
    top: 30px;
    left: 35px;
    width: 20px;
    height: 35px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: inset 0 -2px 0 #ccc;
  }

  .arm {
    position: absolute;
    width: 10px;
    height: 35px;
    background-color: #fff;
    top: 30px;
    border-radius: 50px;
    box-shadow: inset 0 -2px 0 #ccc;
  }

  .arm.left {
    left: 25px;
    transform-origin: top center;
    animation: arm-left 1s ease-in-out infinite;
  }

  .arm.right {
    left: 55px;
    transform-origin: top center;
    animation: arm-right 1s ease-in-out infinite;
  }

  @keyframes arm-left {
    0%,
    100% {
      transform: rotate(30deg);
    }
    50% {
      transform: rotate(-20deg);
    }
  }

  @keyframes arm-right {
    0%,
    100% {
      transform: rotate(-20deg);
    }
    50% {
      transform: rotate(30deg);
    }
  }

  .leg {
    position: absolute;
    width: 10px;
    height: 40px;
    background-color: #fff;
    top: 60px;
    border-radius: 50px;
    box-shadow: inset 0 -2px 0 #ccc;
  }

  .leg.left {
    left: 35px;
    transform-origin: top center;
    animation: leg-left 1s ease-in-out infinite;
  }

  .leg.right {
    left: 45px;
    transform-origin: top center;
    animation: leg-right 1s ease-in-out infinite;
  }

  @keyframes leg-left {
    0%,
    100% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(-30deg);
    }
  }

  @keyframes leg-right {
    0%,
    100% {
      transform: rotate(-30deg);
    }
    50% {
      transform: rotate(10deg);
    }
  }

  @keyframes dots {
    0%,
    20% {
      content: ".";
    }
    40% {
      content: "..";
    }
    60%,
    100% {
      content: "...";
    }
  }
`;

export default Loader;
