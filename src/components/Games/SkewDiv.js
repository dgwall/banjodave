import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SkewDiv = ({ imgSrc, dest, title, description }) => {
  const [randomOffsets, setRandomOffsets] = useState([0, 0, 0, 0]);
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
  };

  const stopInterval = () => {
    clearInterval(intervalId.current);
  };

  return (
    <Link to={dest}>
      <div
        className="tile"
        style={{
          clipPath: generateClipPath(),
          transition: "clip-path 2s linear",
        }}
        onMouseEnter={startInterval}
        onMouseLeave={stopInterval}
      >
        <img src={imgSrc} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default SkewDiv;
