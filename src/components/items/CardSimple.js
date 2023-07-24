import React, { useState, useEffect } from "react";

const CardSimple = ({ data, access }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.webp`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  // Calculating styles
  const cardStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}.webp")`,
    borderRadius: `${data.type === "Deck" ? "0.5vmin" : "1.5vmin"}`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.webp")`,
    filter: `hue-rotate(${data.accessLevel * 50}deg)`,
    opacity: "0.15",
  };

  return (
    <div
      className={`card-container ${isImageLoaded ? "fade-in" : ""} ${
        data.type === "Deck" && "deck-container"
      }`}
      title={`${data.tagline ? data.tagline : data.title}`}
    >
      <div className="card" style={cardStyle}>
        {data.accessLevel > 0 && (
          <div className="card-holo" style={holoStyle}></div>
        )}
        {data.type && data.type === "Deck" ? (
          <div className={`card-border border-deck`}></div>
        ) : (
          <div className={`card-border border-${data.accessLevel}`}></div>
        )}
        {data.accessLevel > 0 && data.accessLevel > access && (
          <div className={`card-locked locked-${data.accessLevel}`}></div>
        )}
        {data.type && data.type !== "Deck" && (
          <>
            <img
              src={`/img/icon/${data.icon}.webp`}
              alt={`${data.icon} icon`}
              className="card-category"
            />
            <img
              src={`/img/cards/bwc-${data.accessLevel}.webp`}
              alt={`BWC Level ${data.accessLevel}`}
              className="card-rarity"
            />
            <div className="card-id">
              <span>
                {data.date.substring(0, 4)}-{data.id}
              </span>
            </div>
          </>
        )}
      </div>
      <div
        className={`card-caption caption-${data.accessLevel} ${
          data.type === "Deck" && "deck-caption"
        }`}
      >
        {data.title}
      </div>
    </div>
  );
};

export default CardSimple;
