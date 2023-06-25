import React, { useState, useEffect } from "react";

const ScreenshotCarousel = ({ type, productId, screenshotCount }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  useEffect(() => {
    setCurrentScreenshotIndex(0);
  }, [screenshotCount]);

  const handleThumbnailClick = (index) => {
    setCurrentScreenshotIndex(index - 1);
  };

  const adjustedScreenshotCount = screenshotCount || 1; // Treat null as 1

  return (
    <div className="carousel-container">
      {adjustedScreenshotCount > 0 ? (
        <>
          <img
            className="main-screenshot"
            src={`/img/${type}/${productId}-${currentScreenshotIndex + 1}.jpg`}
            alt="Screenshot"
            loading="lazy"
          />
          {adjustedScreenshotCount > 1 && (
            <div className="thumbnail-container">
              {[...Array(adjustedScreenshotCount)].map((_, index) => {
                if (index === currentScreenshotIndex) return null;

                return (
                  <img
                    key={index}
                    className="thumbnail"
                    src={`/img/${type}/${productId}-${index + 1}.jpg`}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleThumbnailClick(index + 1)}
                    loading="lazy"
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        "No images available"
      )}
    </div>
  );
};

export default ScreenshotCarousel;
