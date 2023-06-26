import React from "react";

const MapListItem = ({ product, onMapClick, handleTagClick, selectedTag }) => {
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <div onClick={() => onMapClick(product)} className="map-item">
      <div className="thumb">
        <img
          src={`/img/n/thumb/${product.id}.jpg`}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="details">
        <h3>
          {product.tags[0]}
          <br /> {product.title}
        </h3>
        <p>{truncateString(product.description, 90)}</p>
        <div className="tags">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={selectedTag === tag ? "selected" : ""}
              onClick={(e) => {
                e.stopPropagation();
                handleTagClick(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapListItem;
