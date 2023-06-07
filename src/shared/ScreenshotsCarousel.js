import React, { useState, useEffect, useRef, useCallback } from "react";

const ImageWithLightbox = ({ src, alt, onClick, ...props }) => {
  return <img src={src} alt={alt} onClick={onClick} {...props} />;
};

const CarouselControls = ({ onPrev, onNext }) => (
  <div className="carousel-controls">
    <button aria-label="Previous Image" onClick={onPrev}>
      &lt;
    </button>
    <button aria-label="Next Image" onClick={onNext}>
      &gt;
    </button>
  </div>
);

const Lightbox = React.forwardRef(({ src, alt, onClick }, ref) => (
  <div
    className="lightbox"
    onClick={onClick}
    ref={ref}
    tabIndex="-1"
    role="dialog"
    aria-modal="true"
  >
    <img src={src} alt={alt} />
  </div>
));

const ScreenshotsCarousel = ({ screenshots }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const lightboxRef = useRef();
  const savedFocus = useRef();

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isLightboxOpen) {
        return;
      }

      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        default:
          break;
      }
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, handleNext, handlePrev]);

  const openLightbox = () => {
    savedFocus.current = document.activeElement;
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    if (savedFocus.current) {
      savedFocus.current.focus();
    }
  };

  const focusLightbox = () => {
    if (lightboxRef.current) {
      lightboxRef.current.focus();
    }
  };

  useEffect(() => {
    if (isLightboxOpen) {
      focusLightbox();
    }
  }, [isLightboxOpen]);

  const currentScreenshot = screenshots[currentScreenshotIndex];

  return (
    <div className="carousel">
      <figure className="screenshots">
        <ImageWithLightbox
          src={currentScreenshot.src}
          alt={`Screenshot ${currentScreenshotIndex + 1} ${
            currentScreenshot.alt
          }`}
          onClick={openLightbox}
        />
        <CarouselControls onPrev={handlePrev} onNext={handleNext} />
        <figcaption>{currentScreenshot.alt}</figcaption>
      </figure>
      {isLightboxOpen && (
        <Lightbox
          src={currentScreenshot.src}
          alt={`Lightbox image - Screenshot ${currentScreenshotIndex + 1} ${
            currentScreenshot.alt
          }`}
          onClick={closeLightbox}
          ref={lightboxRef}
        />
      )}
    </div>
  );
};

export default ScreenshotsCarousel;
