// TODO: Some duplicate code here (see Card.js). Should extract to
//         another component: Card3d.
//       Create carousel with controls to contain card and media.

import React, { useState, useEffect } from "react";

// Helper function to calculate rotation
const calculateRotation = (e, element) => {
  const { width, height, top, left } = element.getBoundingClientRect();
  const x = 0.5 - (e.clientX - left) / width;
  const y = 0.6 - (e.clientY - top) / height;
  return { x: x * -10, y: y * 10 };
};

const CardExpanded = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [smoothTransition, setSmoothTransition] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `/img/thumbnails/${data.id}.jpg`;
    img.onload = () => setIsImageLoaded(true);
  }, [data.id]);

  // Mouse move handler
  const handleMouseMove = (e) => {
    setSmoothTransition(false);
    const newRotation = calculateRotation(e, e.target);
    setRotation(newRotation);
  };

  // Mouse enter handler
  const handleMouseEnter = (e) => {
    setSmoothTransition(true);
    handleMouseMove(e);
  };

  // Mouse leave handler, resets rotation
  const resetRotation = () => {
    setSmoothTransition(true);
    setRotation({ x: 0, y: 0 });
  };

  // Calculating styles
  const cardStyle = {
    backgroundImage: `url("/img/thumbnails/${data.id}.jpg")`,
    filter: `invert(${Math.abs(rotation.x) / 100}) brightness(${
      1 + (Math.abs(rotation.x) + rotation.y) / 30
    })`,
    transform: `rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
    boxShadow: `${-rotation.x / 20}rem ${
      rotation.y / 20
    }rem 0.5rem rgba(0, 0, 0, 0.75)`,
  };

  const holoStyle = {
    backgroundImage: `url("/img/cards/holo-${data.accessLevel}.png")`,
    backgroundPositionX: `${(rotation.x / 20) * 30}%`,
    backgroundPositionY: `${(-rotation.y / 20) * 30}%`,
    filter: `hue-rotate(${rotation.x * data.accessLevel * 10}deg)`,
    opacity: `${(rotation.y / 10 + Math.abs(rotation.x) / 15) / 3}`,
  };

  const containerStyle = {
    backgroundPositionX: `${-rotation.x}px`,
    backgroundPositionY: `${-rotation.y}px`,
    transition: `${smoothTransition ? "1s" : "0s"}`,
  };

  return (
    <div className="card-expanded">
      <div
        className={`card-container ${isImageLoaded ? "fade-in" : ""}`}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
      >
        <div className="card" style={cardStyle}>
          {data.accessLevel > 0 && (
            <div className="card-holo" style={holoStyle}></div>
          )}
          <img
            src={`/img/cards/bwc-${data.accessLevel}.png`}
            alt={`BWC Level ${data.accessLevel}`}
            className="card-rarity"
          />
          <div className="card-id">{data.id}</div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSIVQTuIOGSoThZERRwlikWwUNoKrTqYvPQPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APi6OSk6CIl3pcUWsR44fE+zrvn8N59gNCoMM3qmgA03TZTcUnM5lbF0CvCCGEAAURlZhmJ9GIGvvV1T31UdzGe5d/3Z/WpeYsBAZF4jhmmTbxBPLNpG5z3iSOsJKvE58TjJl2Q+JHrisdvnIsuCzwzYmZS88QRYrHYwUoHs5KpEU8TR1VNp3wh67HKeYuzVqmx1j35C8N5fSXNdVojiGMJCSQhQkENZVRgI0a7ToqFFJ1LPv5h158kl0KuMhg5FlCFBtn1g//B79lahalJLyksAd0vjvMxCoR2gWbdcb6PHad5AgSfgSu97a82gNlP0uttLXoE9G8DF9dtTdkDLneAoSdDNmVXCtISCgXg/Yy+KQcM3gK9a97cWuc4fQAyNKvlG+DgEBgrUva6z7t7Ouf2b09rfj9INHKWlUKf/QAAAAZiS0dEAMIAwgDCjdfhdgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YMBxI3Fi+f5fwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADFElEQVRYw8WXS0hVURSGv2VGZkVa2YMQs5dYDaJJJBFEQkQZFA1SaFITZw0kImgQQQRREA2dFAQRvSBs4KSBkyyKkiZmqRVEkNdH+Yge6t9kX9ruzrnnXHv9cLlnP9da/16PvQ1AUjswE1gAzAWqzWwAB0lLgH1APVANzHbz4tAB3ASum1kvSdCvWCRpvqQjku5LmtD08UTScUkVUbItq0DQXwZ0Aosi1nwDCoEeYAjocn3bgZUJtj4C7gLNPsNRDCyUlImxqF/SJUkbIpjcKOmGpOEEVupzMmBmJikTw4CPp0Az8BaoBQ4AFSSjxszafc1HfPVcX6WkE5Ke6c9hTFK7pGUhA1OsNTMLqF0NHHS/9aRDH/DYRcRz9//KzBTlhDkVCJRZBZTEDI8Ao8CYmX1Ko2UhecLMeiQVAHOc15uZdaQIdQNmuDUDYRT4Hp/JsUmVpL7gXDMJgndLGpQ06a1pzJsBSYXANZcj0q4pA64CpcFQQfjxOcV+Z4BNeQgviBEeqUlfwma1wLE83eUosDNmrOQXKjyMBsJLgSvZiElp/QbgbND9EsiG4PJcPrBY0kMgA7x3mW15MKcFqIsRXgzcAmZ53d0uY55PE4bFwOYEI+tyjF0AqoLcsAdYF+afuCOYNiTtBRqD7gYz6wIGogwv8Ers7wovd77i45SZ3UsTBeNeXy/wLJj3Btjmbkzz3C+rdL8LuctByLUAp732lygGonxgNlDptfuBXWb2IrB42NWPUaAJ2BF4fENQeCa971UhfW0x5XNUUk0M5dn0/VrSF2/NR0lrIuav9ea0pUnF48ABM3uQcPwrgvZBM3sVMW8wlw9E4bCZtebpiydTrikK6bkdUN+UwuvDO+OdPG7fj0MGur00edHMLqSwoj9wukPTCV8Lym0l0B1em2Ks2Q8sdc3WNA8QSSPuQfPOzMr51/COLfNXUnGC8OKgQP0MQ0nnUrxqfhcrXQbFf1dm88AWYOs/PI2i8Ag6+U/IMjDs9Q15xekD8NV9f/cKykfvGjfpxgAm3KN13GtnI2rA7Tel+P0AhwzDXATqICUAAAAASUVORK5CYII="
            alt="banjeetz"
            className="card-sig"
          />
          <div className={`card-border border-${data.accessLevel}`}></div>
        </div>
      </div>

      <div className={`card-detail caption-${data.accessLevel}`}>
        <div className="card-title">{data.title}</div>
        <div className="card-tagline">{data.tagline}</div>
        {data.text ? (
          <div className="card-text">
            {data.text.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        ) : null}
        <div className="buttons">
          {data.buttons &&
            data.buttons.map((button, index) => (
              <a key={index} href={button.href} className="button">
                {button.label}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardExpanded;
