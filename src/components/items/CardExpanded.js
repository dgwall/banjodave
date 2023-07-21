import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MediaCarousel from "../menus/MediaCarousel";

// Helper function to calculate rotation
const calculateRotation = (e, element, type) => {
  const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
  const { width, height, top, left } = element.getBoundingClientRect();
  let x = 0.5 - (clientX - left) / width;
  let y = 0.6 - (clientY - top) / height;
  // Cap rotation values
  x = Math.max(Math.min(x, 2), -2);
  y = Math.max(Math.min(y, 2), -2);
  if (type === "Deck") {
    x /= 3;
    y /= 3;
  }
  return { x: x * -10, y: y * 10 };
};

const CardExpanded = ({ data, access, deck }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const cardContainerRef = useRef();

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.webp`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  // Function to sort deck array
  const sortedDeck = [...deck].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Move handler
  const handleMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.currentTarget, data.type);
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
    borderRadius: `${data.type === "Deck" ? "0.5vmin" : "1.5vmin"}`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.webp")`,
    backgroundPositionX: `${(rotation.x / 20) * 30}%`,
    backgroundPositionY: `${(-rotation.y / 20) * 30}%`,
    filter: `hue-rotate(${rotation.x * data.accessLevel * 10}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const containerStyle = {
    backgroundImage: `url("/img/bg-card-selected.webp")`,
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
        <MediaCarousel
          cardData={data}
          access={access}
          deck={deck}
          smoothTransition={smoothTransition}
          cardStyle={cardStyle}
          holoStyle={holoStyle}
        />
      </div>

      <div className={`card-detail caption-${data.accessLevel}`}>
        <div className={`card-title ${data.type === "Deck" && "deck-title"}`}>
          {data.title}
        </div>
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
                  <a
                    key={index}
                    href={button.href}
                    className="button"
                    target="_blank"
                    rel="noreferrer"
                  >
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

        {data.type === "Deck" && (
          <div className="deck-sort-container">
            <div className="deck-sort">
              <div className="deck-list-header">
                {sortedDeck.length} {data.title} Cards
              </div>
              <div className="sort">Sort by:</div>
              <div
                className="sort-by"
                onClick={() => requestSort("accessLevel")}
              >
                LVL
              </div>
              <div className="sort-by" onClick={() => requestSort("date")}>
                Date
              </div>
              <div className="sort-by" onClick={() => requestSort("id")}>
                ID
              </div>
              <div className="sort-by" onClick={() => requestSort("title")}>
                Title
              </div>
            </div>
            <table className="deck-list-container">
              <tbody className="deck-list">
                {sortedDeck.map((card, index) => (
                  <tr key={index}>
                    <td className="min">
                      <img
                        src={`/img/cards/bwc-${card.accessLevel}.webp`}
                        alt={`BWC Level ${card.accessLevel}`}
                      />
                    </td>
                    <td className="min">{card.date}</td>
                    <td className="min">
                      <Link to={`/bwc/${card.id}`} className="rowlink">
                        {card.id}
                      </Link>
                    </td>
                    <td>{card.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardExpanded;
