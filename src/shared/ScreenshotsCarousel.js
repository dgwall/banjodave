// ScreenshotsCarousel.js
import React, { useState, useCallback } from "react";
import { Lightbox, LightboxTrigger, LightboxContent } from "./Lightbox";
import CarouselControls from "./CarouselControls";

const ScreenshotsCarousel = ({ screenshots }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentScreenshotIndex(
      (currentScreenshotIndex + 1) % screenshots.length
    );
  }, [currentScreenshotIndex, screenshots.length]);

  const handlePrev = useCallback(() => {
    setCurrentScreenshotIndex(
      (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length
    );
  }, [currentScreenshotIndex, screenshots.length]);

  const currentScreenshot = screenshots[currentScreenshotIndex];

  return (
    <Lightbox>
      <div className="carousel">
        <figure className="screenshots">
          <LightboxTrigger>
            <img
              src={currentScreenshot.src}
              alt={`${currentScreenshotIndex + 1} ${currentScreenshot.alt}`}
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
