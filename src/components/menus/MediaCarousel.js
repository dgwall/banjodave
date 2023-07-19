import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Define constants for media types to avoid typos in string usage
const MEDIA_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  YOUTUBE: "youtube",
};

// Component for Custom Indicator used in Carousel
// This creates a custom carousel indicator with a media type icon
const CustomIndicator = ({
  onClick,
  isSelected,
  index,
  mediaType,
  mediaAlt,
}) => (
  <li
    // Add active class if this indicator is selected
    className={
      isSelected ? "indicator-item indicator-item--active" : "indicator-item"
    }
    // Assign click and keydown event for switching carousel slide
    onClick={onClick}
    onKeyDown={onClick}
    // Unique value and key for each indicator
    value={index}
    key={index}
    role="button"
    tabIndex={0}
    aria-label={`Go to ${mediaType}`}
    // Add a title attribute for tooltips
    title={mediaAlt}
  >
    {/* Display icon according to media type */}
    <img src={`/img/icon/${mediaType}.webp`} alt={`${mediaType} icon`} />
  </li>
);

// Function to prevent the touch move event
// This is to avoid unwanted behavior on touch devices
const preventTouch = (event) => {
  event.preventDefault();
};

// Media Carousel Component
// Displays a carousel with a mix of media types - images, videos, audios, youtube videos
const MediaCarousel = ({
  cardData,
  access,
  deck,
  smoothTransition,
  cardStyle,
  holoStyle,
}) => {
  // Use React useState hook to keep track of currently active slide
  const [activeIndex, setActiveIndex] = useState(0);

  // Prevent touch move on the carousel container to stop page from scrolling when interacting with carousel
  useEffect(() => {
    const container = document.querySelector(".carousel-container");
    if (container) {
      container.addEventListener("touchmove", preventTouch, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("touchmove", preventTouch);
      }
    };
  }, []);

  // Function to handle swipe event and set the active index
  const handleSwipe = (index) => {
    setActiveIndex(index);
  };

  // Reset carousel to start when changing cards
  useEffect(() => {
    setActiveIndex(0);
  }, [cardData]);

  // Function to render each media item based on its type
  const renderMediaItem = (media) => {
    // Switch statement to handle different media types
    switch (media.type) {
      case MEDIA_TYPE.IMAGE:
        return (
          <a
            href={`/img/card-content/img/${media.src}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              key={media.src}
              src={`/img/card-content/img/${media.src}`}
              alt={media.alt}
            />
          </a>
        );

      case MEDIA_TYPE.VIDEO:
        return (
          <video
            key={media.src}
            src={`/img/card-content/vid/${media.src}.webm`}
            controls
          />
        );

      case MEDIA_TYPE.AUDIO:
        return (
          <audio
            key={media.src}
            src={`/img/card-content/mp3/${media.src}.mp3`}
            controls
          />
        );

      case MEDIA_TYPE.YOUTUBE:
        return (
          <iframe
            key={media.src}
            src={`https://www.youtube.com/embed/${media.src}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );

      // Return null if media type doesn't match any cases
      default:
        return null;
    }
  };

  // Function to render a card
  const renderCard = () => {
    return (
      <div className="card" style={cardStyle} onTouchMove={preventTouch}>
        {/* Holographic effect */}
        {cardData.accessLevel > 0 && (
          <div className="card-holo" style={holoStyle}></div>
        )}

        {/* Card border */}
        {cardData.type && cardData.type === "Deck" ? (
          <div
            className={`card-border border-deck`}
            style={{ transition: `${smoothTransition ? "1s" : "0s"}` }}
          ></div>
        ) : (
          <div
            className={`card-border border-${cardData.accessLevel}`}
            style={{ transition: `${smoothTransition ? "1s" : "0s"}` }}
          ></div>
        )}

        {/* BWC Lock */}
        {cardData.accessLevel > 0 && cardData.accessLevel > access && (
          <div className={`card-locked locked-${cardData.accessLevel}`}></div>
        )}

        {/* card-category, card-id and card-rarity */}
        {cardData.type && cardData.type !== "Deck" && (
          <>
            <img
              src={`/img/icon/${cardData.icon}.webp`}
              alt={`${cardData.icon} icon`}
              className="card-category"
            />
            <div className="card-id">
              <span>
                {cardData.date}-{cardData.id}
              </span>
            </div>
            <img
              src={`/img/cards/bwc-${cardData.accessLevel}.webp`}
              alt={`BWC Level ${cardData.accessLevel}`}
              className="card-rarity"
            />
          </>
        )}
      </div>
    );
  };

  // If cardData doesn't have any media, just render the card
  if (!cardData.media || cardData.media.length === 0) {
    return renderCard();
  }

  // If cardData has media, render a carousel with card and media items
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        swipeable={false}
        dynamicHeight={true}
        onChange={handleSwipe}
        selectedItem={activeIndex}
        infiniteLoop={true}
        useKeyboardArrows={true}
        showStatus={false}
        // Custom indicator for carousel
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          let mediaType = "card";
          let mediaAlt = `BWC Card: ${cardData.date}-${cardData.id}`;
          if (index > 0 && cardData.media[index - 1]) {
            mediaType = cardData.media[index - 1].type;
            mediaAlt = cardData.media[index - 1].alt;
          }
          return (
            <CustomIndicator
              onClick={onClickHandler}
              isSelected={isSelected}
              index={index}
              mediaType={mediaType}
              mediaAlt={mediaAlt}
            />
          );
        }}
      >
        {/* Render the card and media items */}
        {renderCard()}
        {cardData.media.map(renderMediaItem)}
      </Carousel>
    </div>
  );
};

export default MediaCarousel;
