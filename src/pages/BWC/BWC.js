import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BWC.css";

const correctSequence = [216, 216, 72, 180];

const generateEmojiSlots = (selectedImages) =>
  selectedImages.map((emoji, index) => (
    <img
      key={index}
      src={emoji > -1 ? `/img/emojikitchen/${index}-${emoji}.png` : undefined}
      alt="emoji"
      className={`emoji-slot slot-${index}`}
    />
  ));

const generateEmojiKeys = (selectedImages, handleClick) =>
  Array.from({ length: 4 }).map((_, listIndex) => (
    <div key={listIndex} className={`emoji-list list-${listIndex}`}>
      {Array.from({ length: 10 }).map((_, imageIndex) => (
        <div
          key={imageIndex}
          className={`emoji-keys ${
            selectedImages[listIndex] === imageIndex ? "selected-emoji" : ""
          }`}
        >
          <img
            src={`/img/emojikitchen/${listIndex}-${imageIndex}.png`}
            alt="emoji"
            onMouseDown={() => handleClick(listIndex, imageIndex)}
          />
        </div>
      ))}
    </div>
  ));

function EmojiPassword() {
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(-1));
  const [access, setAccess] = useState(0);
  const [aroma, setAroma] = useState(0);

  useEffect(() => {
    if (
      selectedImages[0] === -1 &&
      selectedImages[1] === 4 &&
      selectedImages[2] === -1 &&
      aroma > 9
    ) {
      setAccess(2);
    }
  }, [aroma, selectedImages]);

  useEffect(() => {
    if (
      JSON.stringify(selectedImages, (key, value) =>
        typeof value === "number" ? value * 36 : value
      ) === JSON.stringify(correctSequence)
    ) {
      setAccess(1);
    }
  }, [selectedImages]);

  const handleClick = (listIndex, imageIndex) => {
    setSelectedImages((images) => {
      if (listIndex === 3 && imageIndex === 9) {
        setAroma((prevAroma) => prevAroma + 1);
      } else {
        setAroma(0);
      }
      const newImages = [...images];
      newImages[listIndex] = imageIndex;
      return newImages;
    });
  };

  return (
    <>
      {access === 2 ? (
        <div className="monitor">
          <div className="screen">
            <img
              src="/bwc/Banjo-Warez-Corporation.png"
              alt="Banjo Warez Corporation"
              loading="lazy"
              height="256px"
            />
            <div className="screen-page">
              TOP SECRET//SAR-MAPLE SMOKE/SAR-COOL TUNE//WAIVED
            </div>
          </div>
          <div className="inlay">BWC Special Access Device</div>
        </div>
      ) : access === 1 ? (
        <div className="monitor">
          <div className="screen">
            <div className="center">
              <img
                src="/bwc/Banjo-Warez-Corporation.png"
                alt="Banjo Warez Corporation"
                loading="lazy"
                height="256px"
              />
            </div>
            <div className="screen-page">
              <div className="center">
                <div className="sEcUrItY">
                  <br />
                  <u> SECRET//SPECIAL ACCESS REQUIRED-COOL TUNE </u>
                  <br />
                  <u> LEVEL 1 [ONE] ACCESS </u>
                </div>
                <br />
                Congratulations on figuring out the password, bypassing security
                protocol, or finding the GitHub!
                <br />
                Send secret code PSYCHO-GORILLA to BanjoDave right now for a BWC
                Black Key Card granting free top-tier Banjo content for life.
              </div>
            </div>
          </div>
          <div className="inlay">BWC Special Access Device</div>
        </div>
      ) : (
        <div className="monitor">
          <div className="screen pin-screen">
            <div className="emoji-pin-pad">
              <div className="selected-emojis">
                {generateEmojiSlots(selectedImages)}
              </div>
              <div>{generateEmojiKeys(selectedImages, handleClick)}</div>
              <p className="hint">
                abovetempestsdancewovenintothecelestial
                <br />
                anenchantedjunglebongocloakeddawnsblush
                <br />
                changingwhispersofasummerssweetcrescent
                <br />
                darkeyessoughttocapturethebeautyofnight
              </p>
              <p>
                <Link to="../thank-you" className="access-link">
                  Password on Patreon Free Tier
                </Link>
              </p>
            </div>
          </div>
          <div className="inlay">BWC Special Access Device</div>
        </div>
      )}
    </>
  );
}

export default EmojiPassword;
