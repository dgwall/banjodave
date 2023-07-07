import React, { useState, useEffect } from "react";

// The animations array
const animations = [
  "rotate",
  "wobble",
  "pulse",
  "flipHorizontal",
  "fadeInOut",
  "bounce",
];

function HoverAnimationPanel({ data }) {
  const [hover, setHover] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);

  // Assign a position on the circle for each image
  const assignPosition = (index, total, hovered, angleOffset) => {
    // Calculate the angle, distributing the images evenly around the circle
    const angle = angleOffset + (index / total) * 2 * Math.PI;

    // Calculate the radius of the circle
    const radius = hovered ? Math.random() * 15 + 25 : Math.random() * 10 + 20;

    // Calculate the position of the image
    const left = 50 + radius * Math.cos(angle);
    const top = 50 + radius * Math.sin(angle);

    return {
      top: `calc(${top}% - 2rem)`, // Subtract half the size of the image to center it
      left: `calc(${left}% - 2rem)`,
    };
  };

  const getRandomAnimation = () =>
    animations[Math.floor(Math.random() * animations.length)];

  useEffect(() => {
    // Construct URLs for the images
    if (hover || !imageURLs.length) {
      setImageURLs(
        Array.from({ length: data.imageCount }, (_, index) => ({
          url: `/img/hoverpanels/${data.id}-${index}.webp`,
          animation: getRandomAnimation(),
          position: assignPosition(index, data.imageCount, false, 0),
        }))
      );
    }
  }, [data, hover, imageURLs.length]);

  // handle mouse enter and leave events
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  // update image positions when hover state changes
  useEffect(() => {
    const angleOffset = Math.random() * 360;
    setImageURLs((prevImageURLs) =>
      prevImageURLs.map((imgData, index) => ({
        ...imgData,
        position: assignPosition(
          index,
          prevImageURLs.length,
          hover,
          angleOffset
        ),
      }))
    );
  }, [hover]);

  return (
    <div
      className={`ani-panel ${hover ? "hover" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: `url("/img/hoverpanels/blob-${data.id}.svg")` }}
    >
      {imageURLs.map((imgData, index) => (
        <img
          key={index}
          src={imgData.url}
          className={`image ${imgData.animation} ${hover ? "animate" : ""}`}
          style={imgData.position}
          alt=""
          loading="lazy"
        />
      ))}
      <div className="glass">
        <div>{data.name}</div>
      </div>
    </div>
  );
}

export default HoverAnimationPanel;
