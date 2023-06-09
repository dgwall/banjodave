import React from "react";

const ImageWithLightbox = ({ src, alt, onClick, ...props }) => (
  <img src={src} alt={alt} onClick={onClick} {...props} />
);

export default ImageWithLightbox;
