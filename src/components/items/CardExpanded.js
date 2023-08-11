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

// Function to prevent the touch move event
// This is to avoid unwanted behavior on touch devices
const preventTouch = (event) => {
  event.preventDefault();
};

const CardExpanded = ({ data, access, deck, parentDeck }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [clipboardStatus, setClipboardStatus] = useState(null);
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
    e.preventDefault();
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.currentTarget, data.type);
    setRotation(newRotation);
  };

  // Prevent touch move on the carousel container to stop page from scrolling when interacting with carousel
  useEffect(() => {
    const container = document.querySelector(".card-container");
    if (container) {
      container.addEventListener("touchmove", preventTouch, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("touchmove", preventTouch);
      }
    };
  }, []);

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
    backgroundImage: `url("/img/cards/holo-${
      data.deck === "Founder's Deck" ? "c" : data.accessLevel
    }.webp")`,
    backgroundPositionX: `${(rotation.x / 10) * 15}%`,
    backgroundPositionY: `${(-rotation.y / 10) * 15}%`,
    filter: `hue-rotate(${rotation.x * (data.accessLevel + 0.1) * 5}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const containerStyle = {
    backgroundImage: `url("/img/bg-card-selected.webp")`,
    backgroundPositionX: `${-rotation.x}px`,
    backgroundPositionY: `${-rotation.y}px`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const lenticularStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}-L.webp")`,
    opacity: `${Math.abs(rotation.x) / 5}`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  const borderDeckStyle = {
    transform: `translateY(${Math.max(0, -rotation.y * 165)}% )`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
    borderRadius: `${Math.max(
      0,
      ((rotation.x * 2 + -rotation.y / 2) / 3) * 60
    )}% ${Math.max(0, ((-rotation.x * 2 + -rotation.y / 2) / 3) * 60)}% 0 0`,
    boxShadow: `0 0 ${-rotation.y}rem #00000066`,
    height: `${100 - Math.max(0, Math.min(40, -rotation.y * 100))}%`,
    opacity: `${(rotation.y + 1.1) / 1.2}`,
  };

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setClipboardStatus("Copied!");
        setTimeout(() => setClipboardStatus(null), 1000); // Clear the status after 1s
      } catch (err) {
        setClipboardStatus("Failed to copy");
        setTimeout(() => setClipboardStatus(null), 1000); // Clear the status after 1s
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handleClick = (event, href, type) => {
    event.preventDefault();

    if (type === "clipboard") {
      copyToClipboard(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
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
          lenticularStyle={lenticularStyle}
          borderDeckStyle={borderDeckStyle}
        />
      </div>

      {data.type === "Card" && (
        <div className="deck-icon">
          <Link to={`/bfd/${parentDeck}`}>
            <img
              src="/img/icon/deck.webp"
              alt="Deck"
              title="Go to this Card's Deck"
            />
          </Link>
        </div>
      )}

      <div className={`card-detail caption-${data.accessLevel}`}>
        <div className={`card-title ${data.type === "Deck" && "deck-title"}`}>
          {data.title}
        </div>
        <div className="card-tagline">{data.tagline}</div>
        {data.accessLevel <= access ? (
          <>
            {data.text ? (
              <div className="card-text">
                {Array.isArray(data.text) ? (
                  data.text.map((text, index) => <p key={index}>{text}</p>)
                ) : (
                  <p>{data.text}</p>
                )}
              </div>
            ) : null}
            <div className="buttons">
              {data.buttons &&
                data.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.type !== "clipboard" ? button.href : undefined}
                    className="button"
                    onClick={(event) =>
                      handleClick(event, button.href, button.type)
                    }
                  >
                    {(button.type === "clipboard"
                      ? clipboardStatus
                      : undefined) ?? button.label}
                  </a>
                ))}
            </div>
          </>
        ) : (
          <div className="card-text">
            <p>
              Access to this LVL{data.accessLevel} BFD has been restricted on
              the authority of BWC
            </p>
            {data.accessLevel === 1 ? (
              <p>
                LVL1 Access will be available for free, simply by logging in
                with a Patreon account.
              </p>
            ) : data.accessLevel === 2 ? (
              <p>
                LVL2 Access will be available with a Patreon sub, and grants the
                creation of up to 3 custom cards in the Community Deck.
              </p>
            ) : data.accessLevel === 3 ? (
              <p>
                LVL3 Access will be available with a high-tier Patreon sub, and
                grants the creation of your own unique Custom Deck.
              </p>
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
                      <Link to={`/bfd/${card.id}`} className="rowlink">
                        <img
                          src={`/img/cards/bwc-${card.accessLevel}.webp`}
                          alt={`BWC Level ${card.accessLevel}`}
                        />
                        <span className="deck-card-id">
                          {card.date}-{card.id}
                        </span>{" "}
                        {card.title}{" "}
                        {card.tagline && (
                          <span className="deck-card-tagline">{`[${card.tagline}]`}</span>
                        )}
                      </Link>
                    </td>
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
