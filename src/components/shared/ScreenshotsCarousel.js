import React, { useState, useCallback } from "react";
import { Lightbox, LightboxTrigger, LightboxContent } from "./Lightbox";
import CarouselControls from "./CarouselControls";

const ScreenshotsCarousel = ({ screenshots }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setCurrentScreenshotIndex(
      (currentScreenshotIndex + 1) % screenshots.length
    );
  }, [currentScreenshotIndex, screenshots.length]);

  const handlePrev = useCallback(() => {
    setIsLoading(true);
    setCurrentScreenshotIndex(
      (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length
    );
  }, [currentScreenshotIndex, screenshots.length]);

  const currentScreenshot = screenshots[currentScreenshotIndex];

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Lightbox>
      <div className="carousel">
        <figure className="screenshots">
          {isLoading && <div>Loading image...</div>}
          <LightboxTrigger>
            <img
              style={{ display: isLoading ? "none" : "block" }}
              src={currentScreenshot.src}
              alt={`${currentScreenshotIndex + 1} ${currentScreenshot.alt}`}
              onLoad={handleImageLoad}
            />
          </LightboxTrigger>
          <CarouselControls onPrev={handlePrev} onNext={handleNext} />
          <figcaption className="under-construction">
            {currentScreenshot.alt}
          </figcaption>
        </figure>
        <LightboxContent
          src={currentScreenshot.src}
          alt={`Lightbox image - ${currentScreenshotIndex + 1} ${
            currentScreenshot.alt
          }`}
        />
      </div>
    </Lightbox>
  );
};

export default ScreenshotsCarousel;
