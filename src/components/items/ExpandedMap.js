import React from "react";
import VideoPlayer from "../shared/VideoPlayer";
import ScreenshotCarousel from "../shared/ScreenshotCarousel";

const ExpandedMap = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>
        {product.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {product.mediaType === "video" ? (
        <VideoPlayer src={product.mediaSrc} />
      ) : (
        <ScreenshotCarousel screenshots={product.mediaSrc} />
      )}
      {product.mapData ? (
        <button onClick={() => navigator.clipboard.writeText(product.mapData)}>
          Copy Map Data
        </button>
      ) : (
        <a href={product.download} download>
          Download
        </a>
      )}
    </div>
  );
};

export default ExpandedMap;
