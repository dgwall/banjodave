import React from "react";

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

export default CarouselControls;
