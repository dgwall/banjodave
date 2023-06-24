import React from "react";

const MapListItem = ({ product, onMapClick }) => {
  return (
    <div onClick={() => onMapClick(product)}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
    </div>
  );
};

export default MapListItem;
