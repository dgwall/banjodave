// TODO: Create carousel with controls to contain card and media.

import React, { useState, useEffect, useRef } from "react";

// Helper function to calculate rotation
const calculateRotation = (e, element) => {
  const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
  const { width, height, top, left } = element.getBoundingClientRect();
  let x = 0.5 - (clientX - left) / width;
  let y = 0.6 - (clientY - top) / height;
  // Cap rotation values
  x = Math.max(Math.min(x, 1), -1);
  y = Math.max(Math.min(y, 1), -1);
  return { x: x * -10, y: y * 10 };
};

const CardExpanded = ({ data, access }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardContainerRef = useRef();

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.webp`;
    img.onload = () => setIsImageLoaded(true);
    const preventDefault = (e) => e.preventDefault();
    const cardContainer = cardContainerRef.current;
    cardContainer.addEventListener("touchstart", preventDefault, {
      passive: false,
    });
    cardContainer.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      cardContainer.removeEventListener("touchstart", preventDefault);
      cardContainer.removeEventListener("touchmove", preventDefault);
    };
  }, [data.id]);

  // Move handler
  const handleMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.currentTarget);
    setRotation(newRotation);
  };

  // Enter handler
  const handleEnter = (e) => {
    setSmoothTransition(true);
    handleMove(e);
  };

  // Leave handler, resets rotation
  const resetRotation = () => {
    setSmoothTransition(true);
    setRotation({ x: 0, y: 0 });
  };

  // Calculating styles
  const cardStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}.webp")`,
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
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.webp")`,
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
        ref={cardContainerRef}
        className={`card-container ${isImageLoaded ? "fade-in" : ""}`}
        style={containerStyle}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={resetRotation}
        onTouchStart={handleEnter}
        onTouchMove={handleMove}
        onTouchEnd={resetRotation}
      >
        <div className="card" style={cardStyle}>
          {data.accessLevel > 0 && (
            <div className="card-holo" style={holoStyle}></div>
          )}
          <div className={`card-border border-${data.accessLevel}`}></div>{" "}
          {data.accessLevel > 0 && data.accessLevel > access && (
            <div className={`card-locked locked-${data.accessLevel}`}></div>
          )}
          <img
            src={`/img/icon/${data.icon}.webp`}
            alt={`${data.icon} icon`}
            className="card-category"
          />
          <div className="card-id">
            <span>
              {data.date.substring(0, 4)}-{data.id}
            </span>
          </div>
          <img
            src={`/img/cards/bwc-${data.accessLevel}.webp`}
            alt={`BWC Level ${data.accessLevel}`}
            className="card-rarity"
          />
        </div>
      </div>

      <div className={`card-detail caption-${data.accessLevel}`}>
        <div className="card-title">{data.title}</div>
        <div className="card-tagline">{data.tagline}</div>
        {data.accessLevel <= access ? (
          <>
            {data.text ? (
              <div className="card-text">
                {data.text.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            ) : null}
            <div className="buttons">
              {data.buttons &&
                data.buttons.map((button, index) => (
                  <a key={index} href={button.href} className="button">
                    {button.label}
                  </a>
                ))}
            </div>
          </>
        ) : (
          <div className="card-text">
            <p>
              Access to this LVL{data.accessLevel} item has been restricted on
              the authority of BWC
            </p>
            {data.accessLevel === 1 ? (
              <p>
                LVL1 Access will be available for free, simply by logging in
                with a Patreon account.
              </p>
            ) : data.accessLevel === 2 ? (
              <p>LVL2 Access will be available with a low-tier Patreon sub.</p>
            ) : data.accessLevel === 3 ? (
              <p>LVL3 Access will be available with a high-tier Patreon sub.</p>
            ) : (
              {}
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardExpanded;
