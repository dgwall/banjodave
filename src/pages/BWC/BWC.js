import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BWC.css";

const correctSequence = [6, 6, 2, 5];

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
    console.log(
      "In an enchanted jungle—Bongo, cloaked in dawn's blush. Above, a tempest's dance woven into the celestial. Changing—whispers of summer's sweet crescent. Dark eyes plotted to capture the beauty of night."
    );
  }, []);

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
    if (JSON.stringify(selectedImages) === JSON.stringify(correctSequence)) {
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
              src="Banjo-Warez-Corporation.png"
              alt="Banjo Warez Corporation"
            />
            <div className="screen-page">
              <div className="data">
                TOP SECRET//SAR-MAPLE SMOKE/SAR-COOL TUNE//WAIVED
                <br />
                S//SAR-CT
                <br />
                <u> &#9650; Animations </u>
                <br />
                <u> &#9650; Art </u>
                <br />
                <u> &#9650; Banjo's Arcade </u>
                <br />
                <u> &#9650; BanjoZine </u>
                <br />
                <u> &#9650; Cringe Archive 2017 </u>
                <br />
                <u> &#9650; Digital Art </u>
                <br />
                <u> &#9650; DOOM Maps </u>
                <br />
                <u> &#9650; DOOM Speedmaps </u>
                <br />
                <u> &#9650; Game Jams </u>
                <br />
                <u> &#9650; Music </u>
                <br />
                <u> &#9650; N Maps </u>
                <br />
                <u> &#9650; Posters </u>
                <br />
                <u> &#9650; rootootoot collector's edition </u>
                <br />
                <u> &#9650; Stickers </u>
                <br />
                TS//SAR-MS//WAIVED
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Animations{" "}
                </u>
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Digital Art{" "}
                </u>
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Gameplay{" "}
                </u>
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Albums{" "}
                </u>
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Magazines{" "}
                </u>
                <br />
                <u>
                  <span className="a"> &#9632; Archive </span> Power Points{" "}
                </u>
                <br />
                <u> &#9650; Scrapped Games </u>
                <br />
                Release{" "}
                <a href="www.google.com">
                  &#11043; Freeware <span>dl.info 0 B</span>
                </a>
                <br />
                <span>Leaked: Coming soon</span>
              </div>
              <div className="center">
                &#9650; Banjo <span></span>
                <br />
                &#9650; &#9650; Warez
                <br />
                CORPORATION
                <br />
                <br />
                <a
                  href="https://www.banjodave.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="site-link"
                >
                  banjodave.com
                </a>
                <br />
                <a
                  href="https://twitter.com/banjeetz"
                  target="_blank"
                  rel="noreferrer"
                  className="twitter-link"
                >
                  @banjeetz
                </a>
                <br />
                <br />
                Copyright &copy; MCMXCIII-MMXIII. All rights reserved.
                <br />
              </div>
            </div>
          </div>
          <div className="inlay">BWC Special Access Device</div>
        </div>
      ) : access === 1 ? (
        "SECRET//SPECIAL ACCESS REQUIRED-COOL TUNE"
      ) : (
        <div className="monitor">
          <div className="screen pin-screen">
            <div className="emoji-pin-pad">
              <div className="selected-emojis">
                {generateEmojiSlots(selectedImages)}
              </div>
              {generateEmojiKeys(selectedImages, handleClick)}
              <p>
                <Link to="thank-you" className="access-link">
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
