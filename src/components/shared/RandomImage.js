import React, { useState, useEffect } from "react";

function RandomImage({ path, images }) {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const selectRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomImage(images[randomIndex]);
    };
    selectRandomImage();
  }, [images]);

  return (
    <>
      {randomImage && (
        <img src={`${path}-${randomImage}.webp`} alt={randomImage} />
      )}
    </>
  );
}

export default RandomImage;
