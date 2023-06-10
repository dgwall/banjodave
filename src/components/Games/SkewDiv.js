import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SkewDiv = ({ imgSrc, dest, title, description }) => {
  const [randomOffsets, setRandomOffsets] = useState([0, 0, 0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const intervalId = useRef(null);

  const generateRandomOffsets = () => {
    setRandomOffsets([
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2,
      Math.random() * 2,
    ]);
  };

  // Generate initial random values on component mount
  useEffect(generateRandomOffsets, []);

  // Function to create the clip path polygon points
  const generateClipPath = () => {
    const offsets = [...randomOffsets];
    return `polygon(
      ${offsets[1]}rem ${offsets[0]}rem, 
      calc(100% - ${offsets[0]}rem) ${offsets[1]}rem, 
      calc(100% - ${offsets[3]}rem) calc(100% - ${offsets[2]}rem), 
      ${offsets[2]}rem calc(100% - ${offsets[3]}rem)
    )`;
  };

  const startInterval = () => {
    generateRandomOffsets();
    intervalId.current = setInterval(generateRandomOffsets, 2000);
    setIsHovering(true);
  };

  const stopInterval = () => {
    clearInterval(intervalId.current);
    setIsHovering(false);
  };

  return (
    <Link to={dest}>
      <div
        className="tile"
        onMouseEnter={startInterval}
        onMouseLeave={stopInterval}
      >
        <div
          className="image"
          style={{
            clipPath: generateClipPath(),
            transition: "clip-path 2s linear",
          }}
        >
          <img src={imgSrc} alt={title} />
        </div>
        <div className="details">
          <h3>
            {title.split("").map((char, index) => {
              const style = {
                animationName: isHovering ? "wave" : "none",
                animationDuration: "1s",
                animationTimingFunction: "ease",
                animationIterationCount: "infinite",
                animationDelay: isHovering ? `${index * 0.1}s` : "0s",
                display: "inline-block",
              };

              return (
                <span key={index} style={style}>
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SkewDiv;
