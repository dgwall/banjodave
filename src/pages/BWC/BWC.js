import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BWC.css";

const correctSequence = [216, 216, 72, 180];

const emojiDescriptions = {
  "0-0": "Hibiscus Slot Machine",
  "0-1": "Money Face Poop",
  "0-2": "Dazed Diamond",
  "0-3": "VHS in Waste Basket",
  "0-4": "UFO under Wave",
  "0-5": "Earth-Sun",
  "0-6": "Cool Thundercloud",
  "0-7": "Shocked Banana",
  "0-8": "Rudolf Bread",
  "0-9": "Tiger Candy",
  "1-0": "Fork and Knife with Infinity",
  "1-1": "Brain Ghost",
  "1-2": "Fuming",
  "1-3": "Colourful Microbes",
  "1-4": "Disguised Alien",
  "1-5": "Moonlit Love Letter",
  "1-6": "Monkey eating Satsuma",
  "1-7": "Vomiting Cupcake",
  "1-8": "Can of Saturn",
  "1-9": "City Ablaze",
  "2-0": "Diamond Pepper",
  "2-1": "Mushroom Rabbits",
  "2-2": "Shrinking Watermelon",
  "2-3": "Goat eating Jack-o'-Lantern",
  "2-4": "Newspaper Stump",
  "2-5": "Visions of a Wilted Rose",
  "2-6": "Shaking Full-Moon Face",
  "2-7": "Arrow through Anatomical Heart",
  "2-8": "Sad Meat on Bone",
  "2-9": "Thoughtful Hotdog",
  "3-0": "Drooling Star",
  "3-1": "Shrugging Nazar",
  "3-2": "Partying Cyclops",
  "3-3": "Frozen Scorpion",
  "3-4": "Monochrome Rainbow",
  "3-5": "New Moon Face under a Box-and-Stick Trap",
  "3-6": "Fossil Skull",
  "3-7": "Robot Holding Rock Overhead",
  "3-8": "Cactus Lips",
  "3-9": "Maple Leaf Smoke",
};

const generateEmojiSlots = (selectedImages) =>
  selectedImages.map((emoji, index) => (
    <div className="emoji-slot" key={index}>
      <img
        src={emoji > -1 ? `/img/emojikitchen/${index}-${emoji}.png` : undefined}
        alt="emoji"
        className={`emoji-slot slot-${index} ${
          emoji !== -1 ? "selected" : "empty"
        }`}
      />
    </div>
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
            alt={emojiDescriptions[`${listIndex}-${imageIndex}`]}
            title={emojiDescriptions[`${listIndex}-${imageIndex}`]}
            onMouseDown={() => handleClick(listIndex, imageIndex)}
          />
        </div>
      ))}
    </div>
  ));

const AccessScreen = ({ accessLabel, secretCode }) => (
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
            <u> {accessLabel} </u>
            <br />
            <br />
          </div>
        </div>
        {secretCode && (
          <p>
            Congratulations on figuring out the password, bypassing security
            protocol, or finding the GitHub!
            <br />
            Send secret code <u className="sEcUrItY"> {secretCode} </u> to
            BanjoDave right now for a BWC Black Keycard granting free top-tier
            Banjo content for life.
          </p>
        )}
      </div>
    </div>
    <div className="inlay">BWC Special Access Device</div>
  </div>
);

const MainScreen = ({ selectedImages, handleClick }) => (
  <div className="monitor">
    <div className="screen pin-screen">
      <div className="emoji-pin-pad">
        <div className="selected-emojis">
          {generateEmojiSlots(selectedImages)}
        </div>
        <div>{generateEmojiKeys(selectedImages, handleClick)}</div>
        <p className="hint">
          ABOVEDANCETEMPESTSASILENTROARORCOOLTUNE
          <br />
          ANENCHANTEDJUNGLEBONGOCLOAKEDDAWNSBLUSH
          <br />
          CHANGINGWHISPERSOFASUMMERSSWEETCRESCENT
          <br />
          DARKEYESSOUGHTTOCAPTURETHEBEAUTYOFNIGHT
        </p>
        <p>
          {/*<Link to="../thank-you" className="access-link">
            Password on Patreon Free Tier
          </Link>*/}
        </p>
      </div>
    </div>
    <div className="inlay">BWC Special Access Device</div>
  </div>
);

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
        <AccessScreen accessLabel="TOP SECRET//SAR-MAPLE SMOKE/SAR-COOL TUNE//WAIVED" />
      ) : access === 1 ? (
        <AccessScreen
          accessLabel="SECRET//SPECIAL ACCESS REQUIRED-COOL TUNE"
          secretCode="PSYCHO-GORILLA"
        />
      ) : (
        <MainScreen selectedImages={selectedImages} handleClick={handleClick} />
      )}
    </>
  );
}

export default EmojiPassword;
