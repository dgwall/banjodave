// Lightbox.js
import React, { useState, useEffect, createContext, useContext } from "react";

const LightboxContext = createContext();

export const Lightbox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <LightboxContext.Provider value={{ isOpen, openLightbox, closeLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
};

export const LightboxTrigger = ({ children }) => {
  const { openLightbox } = useContext(LightboxContext);

  return React.cloneElement(children, {
    onClick: openLightbox,
  });
};

export const LightboxContent = ({ src, alt }) => {
  const { isOpen, closeLightbox } = useContext(LightboxContext);

  return (
    isOpen && (
      <div
        className="lightbox"
        onClick={closeLightbox}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <img src={src} alt={alt} />
      </div>
    )
  );
};
