import React, { useState } from "react";
import "./Card.css";

// Helper function for calculation
const calculateRotation = (e, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const x = 0.5 - (e.pageX - left) / width;
  const y = 0.6 - (e.pageY - top) / height;
  return { x: x * -10, y: y * 10 };
};

const Card = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);

  // Function to handle mouse move
  const handleMouseMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.target);
    setRotation(newRotation);
  };

  // Handle mouse enter
  const handleMouseEnter = (e) => {
    setSmoothTransition(true);
    handleMouseMove(e);
  };

  // Reset rotation
  const resetRotation = () => {
    setSmoothTransition(true);
    setRotation({ x: 0, y: 0 });
  };

  // Calculate styles outside of JSX
  const cardStyle = {
    backgroundImage: `linear-gradient(170deg,rgba(17,17,17,0.75),transparent 30%,transparent 75%,rgba(17,17,17,0.75)), url("/img/thumbnails/${data.id}.jpg")`,
    filter: `invert(${Math.abs(rotation.x) / 100}) brightness(${
      1 + (Math.abs(rotation.x) + rotation.y) / 30
    })`,
    transform: `scale(${!smoothTransition ? "1.15" : "1"}) rotateY(${
      rotation.x
    }deg) rotateX(${rotation.y}deg)`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
    boxShadow: `${-rotation.x / 20}rem ${
      rotation.y / 20
    }rem 0.5rem rgba(0, 0, 0, 0.25)`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.png")`,
    backgroundPositionX: `${(rotation.x / 20) * 30}%`,
    backgroundPositionY: `${(-rotation.y / 20) * 30}%`,
    filter: `hue-rotate(${rotation.x * 20}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
  };

  const iconStyle = {
    color: `${data.accessLevel === 1 ? "#00ffbc" : "#fff"}`,
  };

  return (
    <div
      className="card-container"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div className="card" style={cardStyle}>
        {data.accessLevel > 0 && (
          <div className="card-holo" style={holoStyle}></div>
        )}
        <div className={`card-border border-${data.accessLevel}`}></div>
        <div className="card-text">
          <div className="card-header">
            <h1>{data.title}</h1>
          </div>
          <p>{data.tagline}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
