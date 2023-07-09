import React, { useState, useEffect } from "react";
import "./Card.css";

// Helper function to calculate rotation
const calculateRotation = (e, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const x = 0.5 - (e.clientX - left) / width;
  const y = 0.6 - (e.clientY - top) / height;
  return { x: x * -10, y: y * 10 };
};

const Card = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.jpg`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  // Mouse move handler
  const handleMouseMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.target);
    setRotation(newRotation);
  };

  // Mouse enter handler
  const handleMouseEnter = (e) => {
    setSmoothTransition(true);
    handleMouseMove(e);
  };

  // Mouse leave handler, resets rotation
  const resetRotation = () => {
    setSmoothTransition(true);
    setRotation({ x: 0, y: 0 });
  };

  // Calculating styles
  const cardStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}.jpg")`,
    filter: `invert(${Math.abs(rotation.x) / 100}) brightness(${
      1 + (Math.abs(rotation.x) + rotation.y) / 30
    })`,
    transform: `scale(${!smoothTransition ? "1.1" : "1"}) rotateY(${
      rotation.x
    }deg) rotateX(${rotation.y}deg)`,
    transition: `transform ${smoothTransition ? "1s" : "0s"}`,
    boxShadow: `${-rotation.x / 20}rem ${
      rotation.y / 20
    }rem 0.5rem rgba(0, 0, 0, 0.75)`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.png")`,
    backgroundPositionX: `${(rotation.x / 20) * 30}%`,
    backgroundPositionY: `${(-rotation.y / 20) * 30}%`,
    filter: `hue-rotate(${rotation.x * data.accessLevel * 10}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
  };

  return (
    <div
      className={`card-container ${isImageLoaded ? "fade-in" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      title={data.title}
    >
      <div className="card" style={cardStyle}>
        {data.accessLevel > 0 && (
          <div className="card-holo" style={holoStyle}></div>
        )}
        <div className={`card-border border-${data.accessLevel}`}></div>
      </div>
      <div className={`card-caption caption-${data.accessLevel}`}>
        {data.title}
      </div>
    </div>
  );
};

export default Card;
