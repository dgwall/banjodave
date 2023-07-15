import React, { useState, useEffect } from "react";

const CardSimple = ({ data, access }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.webp`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  return (
    <div className="card-container neon-effect">
      <div
        className={`card simple-card border-${data.accessLevel} ${
          isImageLoaded ? "fade-in" : ""
        }`}
        style={{
          backgroundImage: `url("/img/thumbnails/${data.id}.webp")`,
        }}
      >
        <div className={`card-border border-${data.accessLevel}`}></div>
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
      <div className={`card-caption caption-${data.accessLevel}`}>
        {data.title}
      </div>
    </div>
  );
};

export default CardSimple;
