import React, { useState, useEffect } from "react";
import "./Card.css";

// Helper function to calculate rotation
const calculateRotation = (e, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const x = 0.5 - (e.clientX - left) / width;
  const y = 0.6 - (e.clientY - top) / height;
  return { x: x * -10, y: y * 10 };
};

const CardExpanded = ({ data }) => {
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
    transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
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

  const containerStyle = {
    backgroundPositionX: `${-rotation.x}px`,
    backgroundPositionY: `${-rotation.y}px`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  return (
    <div className="card-expanded">
      <div
        className={`card-container ${isImageLoaded ? "fade-in" : ""}`}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
      >
        <div className="card" style={cardStyle}>
          {data.accessLevel > 0 && (
            <div className="card-holo" style={holoStyle}></div>
          )}
          <div className={`card-border border-${data.accessLevel}`}></div>
        </div>
      </div>
      <div className={`card-detail caption-${data.accessLevel}`}>
        <div className="card-title">{data.title}</div>
        <div className="card-tagline">{data.tagline}</div>
        <div className="card-text">
          {data.text
            ? data.text.map((text, index) => <p key={index}>{text}</p>)
            : null}
        </div>
        <div className="buttons">
          {data.buttons &&
            data.buttons.map((button, index) => (
              <a key={index} href={button.href} className="button">
                {button.label}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardExpanded;
