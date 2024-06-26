import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Define constants for media types to avoid typos in string usage
const MEDIA_TYPE = {
  IMAGE: "image",
  IMAGE_EXT: "image-ext",
  VIDEO: "video",
  VIDEO_EXT: "video-ext",
  AUDIO: "audio",
  AUDIO_EXT: "audio-ext",
  YOUTUBE: "youtube",
  YOUTUBE_PL: "youtube-pl",
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
    aria-label={`Go to ${mediaType.replace("-ext", "")}`}
    // Add a title attribute for tooltips
    title={mediaAlt}
  >
    {/* Display icon according to media type */}
    <img
      src={`/img/icon/${mediaType.replace("-ext", "")}.webp`}
      alt={`${mediaType.replace("-ext", "")} icon`}
    />
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
  lenticularStyle,
  borderDeckStyle,
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
            key={media.src}
            href={`/img/card-content/img/${media.src}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`/img/card-content/img/${media.src}`}
              alt={media.alt}
              className="carousel-image"
            />
            <br />
            {media.alt}
          </a>
        );

      case MEDIA_TYPE.IMAGE_EXT:
        return (
          <a key={media.src} href={media.src} target="_blank" rel="noreferrer">
            <img src={media.src} alt={media.alt} className="carousel-image" />
            <br />
            {media.alt}
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

      case MEDIA_TYPE.VIDEO_EXT:
        return <video key={media.src} src={media.src} controls />;

      case MEDIA_TYPE.AUDIO:
        return (
          <audio
            key={media.src}
            src={`/img/card-content/mp3/${media.src}.mp3`}
            controls
          />
        );

      case MEDIA_TYPE.AUDIO_EXT:
        return <audio key={media.src} src={media.src} controls />;

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

      case MEDIA_TYPE.YOUTUBE_PL:
        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/videoseries?list=${media.src}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
        {cardData.lenticular && (
          <div className="card-lenticular" style={lenticularStyle}></div>
        )}
        {(cardData.accessLevel > 0 || cardData.deck === "Founder's Deck") && (
          <div className="card-holo" style={holoStyle}></div>
        )}

        {/* Card border */}
        {cardData.type && cardData.type === "Deck" ? (
          <div
            className={`card-border border-deck`}
            style={borderDeckStyle}
          ></div>
        ) : (
          <div
            className={`card-border border-${cardData.accessLevel}`}
            style={{ transition: `${smoothTransition ? "1s" : "0s"}` }}
          ></div>
        )}

        {/* BFD Lock */}
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
            {cardData.deck === "Founder's Deck" ? (
              <img
                src="/img/icon/founders.webp"
                alt="Founder's Deck"
                className="card-rarity"
              />
            ) : (
              <img
                src={`/img/cards/bwc-${cardData.accessLevel}.webp`}
                alt={`BWC Level ${cardData.accessLevel}`}
                className={`card-rarity ${cardData.lenticular && "lenticular"}`}
              />
            )}
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
        {/* Render the card and media items inside carousel */}
        {renderCard()}
        {cardData.media.map(renderMediaItem)}
      </Carousel>
    </div>
  );
};

export default MediaCarousel;
