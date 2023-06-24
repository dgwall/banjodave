import React, { useState } from "react";

const ScreenshotCarousel = ({ screenshots }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentScreenshotIndex(
      (prevIndex) => (prevIndex + 1) % screenshots.length
    );
  };

  return (
    <div>
      <img src={screenshots[currentScreenshotIndex]} alt="Screenshot" />
      <button onClick={handleNextClick}>Next Screenshot</button>
    </div>
  );
};

export default ScreenshotCarousel;
