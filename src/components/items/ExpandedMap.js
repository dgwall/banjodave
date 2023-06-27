import React from "react";
import VideoPlayer from "../shared/VideoPlayer";
import ScreenshotCarousel from "../shared/ScreenshotCarousel";

const ExpandedMap = ({ product, handleTagClick, selectedTag }) => {
  return (
    <>
      <div className="map-item-selected">
        <div className="media">
          {product.video ? (
            <VideoPlayer src={product.mediaSrc} />
          ) : (
            <ScreenshotCarousel
              type="n"
              productId={product.id}
              screenshotCount={product.screenshotCount}
            />
          )}
        </div>
        <div className="details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="tags">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={selectedTag === tag ? "selected" : ""}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
          {product.buttons && (
            <div className="buttons">
              {product.buttons.map((button) => (
                <a
                  key={button.label}
                  href={button.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {button.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpandedMap;
