import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requires a loader

const MEDIA_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  YOUTUBE: "youtube",
};

const CustomIndicator = ({ onClick, isSelected, index, mediaType }) => (
  <li
    className={
      isSelected ? "indicator-item indicator-item--active" : "indicator-item"
    }
    onClick={onClick}
    onKeyDown={onClick}
    value={index}
    key={index}
    role="button"
    tabIndex={0}
    aria-label={`Go to ${mediaType}`}
  >
    <img src={`/img/icon/${mediaType}.webp`} alt={`${mediaType} icon`} />
  </li>
);

const preventTouch = (event) => {
  event.preventDefault();
};

const MediaCarousel = ({
  cardData,
  access,
  deck,
  smoothTransition,
  cardStyle,
  holoStyle,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipe = (index) => {
    setActiveIndex(index);
  };

  const renderMediaItem = (media) => {
    switch (media.type) {
      case MEDIA_TYPE.IMAGE:
        return <img key={media.src} src={media.src} alt={media.alt} />;
      case MEDIA_TYPE.VIDEO:
        return <video key={media.src} src={media.src} controls />;
      case MEDIA_TYPE.AUDIO:
        return <audio key={media.src} src={media.src} controls />;
      case MEDIA_TYPE.YOUTUBE:
        return (
          <iframe
            key={media.src}
            src={`https://www.youtube.com/embed/${media.src}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      default:
        return null;
    }
  };

  const renderCard = () => {
    return (
      <div className="card" style={cardStyle} onTouchMove={preventTouch}>
        {cardData.accessLevel > 0 && (
          <div className="card-holo" style={holoStyle}></div>
        )}
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
        {cardData.accessLevel > 0 && cardData.accessLevel > access && (
          <div className={`card-locked locked-${cardData.accessLevel}`}></div>
        )}
        {cardData.type && cardData.type !== "Deck" && (
          <>
            <img
              src={`/img/icon/${cardData.icon}.webp`}
              alt={`${cardData.icon} icon`}
              className="card-category"
            />
            <div className="card-id">
              <span>
                {cardData.date.substring(0, 4)}-{cardData.id}
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

  // If media array is empty, return just the card
  if (!cardData.media || cardData.media.length === 0) {
    return renderCard();
  }

  // Else, return the card within the Carousel along with other media
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        swipeable={true}
        dynamicHeight={true}
        onChange={handleSwipe}
        selectedItem={activeIndex}
        infiniteLoop={true}
        useKeyboardArrows={true}
        showStatus={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          let mediaType = "card";
          if (index > 0 && cardData.media[index - 1]) {
            mediaType = cardData.media[index - 1].type;
          }
          return (
            <CustomIndicator
              onClick={onClickHandler}
              isSelected={isSelected}
              index={index}
              mediaType={mediaType}
            />
          );
        }}
      >
        {renderCard()}
        {cardData.media.map(renderMediaItem)}
      </Carousel>
    </div>
  );
};

export default MediaCarousel;
