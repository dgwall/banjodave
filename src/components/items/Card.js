import React, { useState, useEffect } from "react";

// Helper function to calculate rotation
const calculateRotation = (e, element, type) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  let x = 0.5 - (e.clientX - left) / width;
  let y = 0.6 - (e.clientY - top) / height;
  if (type === "Deck") {
    x /= 3;
    y /= 3;
  }
  return { x: x * -10, y: y * 10 };
};

const Card = ({ data, access }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.webp`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  // Mouse move handler
  const handleMouseMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.target, data.type);
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
    backgroundImage: `url("/img/thumbnails/${data.id}.webp")`,
    filter: `${
      data.type !== "Deck" &&
      `invert(${Math.abs(rotation.x) / 100}) brightness(${
        1 + (Math.abs(rotation.x) + rotation.y) / 30
      })`
    }`,
    transform: `${
      data.type !== "Deck" &&
      `scale(${
        !smoothTransition ? (data.type === "Deck" ? "1.01" : "1.1") : "1"
      }) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`
    }`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
    boxShadow: `${
      data.type !== "Deck" &&
      `${-rotation.x / 20}rem ${rotation.y / 20}rem ${
        ((Math.abs(rotation.x) / 20 + Math.abs(rotation.y) / 20) / 2) * 5
      }rem rgba(0, 0, 0, 0.75)`
    }`,
    borderRadius: `${data.type === "Deck" ? "0.5vmin" : "1.5vmin"}`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${
      data.type !== "Deck"
        ? data.deck === "Founder's Deck"
          ? "c"
          : data.accessLevel
        : ""
    }.webp")`,
    backgroundPositionX: `${(rotation.x / 10) * 15}%`,
    backgroundPositionY: `${(-rotation.y / 10) * 15}%`,
    filter: `hue-rotate(${rotation.x * (data.accessLevel + 0.1) * 5}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const lenticularStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}-L.webp")`,
    opacity: `${Math.abs(rotation.x) / 4.5}`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const borderDeckStyle = {
    transition: `${smoothTransition ? "2s ease-out" : "0s"}`,
    borderRadius: `
    ${Math.max(0, ((-rotation.x + rotation.y) / 2) * 10)}%
    ${Math.max(0, ((rotation.x + rotation.y) / 2) * 10)}%
    ${Math.max(0, ((rotation.x - rotation.y) / 2) * 20)}%
    ${Math.max(0, ((-rotation.x - rotation.y) / 2) * 20)}%`,
    boxShadow: `0 0.5rem ${
      (Math.abs(rotation.x) + Math.abs(rotation.y)) / 2
    }rem #00000055`,
  };

  return (
    <div
      className={`card-container ${isImageLoaded ? "fade-in" : ""} ${
        data.type === "Deck" && "deck-container"
      } ${data.accessLevel > access && "container-lock"}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      title={`${data.tagline ? data.tagline : data.title}`}
    >
      <div className="card" style={cardStyle}>
        {data.lenticular && (
          <div className="card-lenticular" style={lenticularStyle}></div>
        )}
        {((data.accessLevel > 0 && data.accessLevel <= access) ||
          data.deck === "Founder's Deck") && (
          <div className="card-holo" style={holoStyle}></div>
        )}
        {data.type && data.type === "Deck" ? (
          <div
            className={`card-border border-deck`}
            style={borderDeckStyle}
          ></div>
        ) : (
          <>
            {data.accessLevel > 0 && data.accessLevel > access ? (
              <div className={`card-locked locked-${data.accessLevel}`}></div>
            ) : (
              <div
                className={`card-border border-${data.accessLevel}`}
                style={{ transition: `${smoothTransition ? "1s" : "0s"}` }}
              ></div>
            )}
          </>
        )}
        {data.type &&
          data.type !== "Deck" &&
          data.deck === "Founder's Deck" && (
            <img
              src="/img/icon/founders.webp"
              alt="Founder's Deck"
              className="card-rarity"
            />
          )}
      </div>
      <div
        className={`card-caption caption-${data.accessLevel} ${
          data.type === "Deck" && "deck-caption"
        }`}
      >
        {data.type === "Deck" ? (
          <img
            src={`/img/icon/deck.webp`}
            alt={`Deck icon`}
            className="card-category-title"
          />
        ) : (
          <img
            src={`/img/icon/${data.icon}.webp`}
            alt={`${data.icon} icon`}
            className="card-category-title"
          />
        )}
        <div>{data.title}</div>
      </div>
    </div>
  );
};

export default Card;
