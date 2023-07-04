import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import "./BWC.css";
import BwcTracker from "../../components/menus/BwcTracker";

const correctSequence = [216, 216, 72, 180];

const emojiDescriptions = {
  "0-0": "Hibiscus Slot Machine",
  "0-1": "Poop Money Face",
  "0-2": "Dizzy Diamond",
  "0-3": "A VHS Tape in Waste Basket",
  "0-4": "Drones in the Ocean",
  "0-5": "Earth-Sun",
  "0-6": "Cool Thundercloud",
  "0-7": "Shocked Banana",
  "0-8": "Rudolf Bread",
  "0-9": "Tiger Candy",
  "1-0": "Fork and Knife with Infinity Symbol",
  "1-1": "Brain Ghost",
  "1-2": "Fuming",
  "1-3": "Colourful Microbes",
  "1-4": "Disguised Alien",
  "1-5": "Moonlit Love Letter",
  "1-6": "Monkey Eating Satsuma",
  "1-7": "Vomiting Cupcake",
  "1-8": "Can of Saturn",
  "1-9": "City Ablaze",
  "2-0": "Diamond Pepper",
  "2-1": "Mushroom Rabbits",
  "2-2": "Shrinking Watermelon",
  "2-3": "Goat Eating a Jack-o'-Lantern",
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

const AccessScreen = ({ access, accessLabel, secretCode, data }) => (
  <div className="monitor">
    <div className="screen">
      <div className="center">
        <img
          src="/bwc/Banjo-Warez-Corporation.png"
          alt="Banjo Warez Corporation"
          loading="lazy"
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
          <div className="data">
            <p>
              Congratulations on figuring out the password, bypassing security
              protocol, or finding the GitHub!
              <br />
              Send secret code <u className="sEcUrItY"> {secretCode} </u> to
              BanjoDave right now for a BWC Black Keycard granting free L3 BWC
              Access for life.
            </p>
            <BwcTracker data={data} access={1} />
          </div>
        )}
        {access === "2" ? (
          <>
            <div className="data">
              <BwcTracker data={data} access={2} />
            </div>
          </>
        ) : (
          ""
        )}

        <br />
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
        {/* prettier-ignore */}
        <pre>{`
       ..
       .^~
        .YJ:                                                    .:^^~^^:.
         ?Y7~^:...                       .^7?7!~^^:.            .!???7!~^.
         ?7~!!!!7?777?~.                ..:!7JYYJ??J7:        .~!7^:.
        :7!~^:::!?YYJYY?:             ....    .^!??7YY?^      .~^
      .!?!7!^.    :!?JYY7^                       .!!^7JJ!
     :??~~!!~:.    .~!Y5Y!:            .:::^:  .:!JY?7JY?.          ^7?JJ?7~::::
     ::    .:~:.     :JP557:          .::~~~7~.   .!Y?J5?.        .^?JJ?7!7??J7!
             :^.      7P5P?:.             .:~!~.    ^??557.     :!7!~77^:.:::^:.
   ..         :^       ^YPJ77~^:            :~!~...:7JYPPJ.       .:!?7:
  :~          .^.    .!7Y5PPPY?~:          :!!!7~^~755YYJ?^     .^!7???7:
 :?^           ^.    :??5J!~^::^~~:... ...:^777?7~..:!7!7J?7^..~J5?7^:^~~^.
 !?.          :^       :PBBBGJ. .:^~!!^:..:::^!!!!~.  ~~^!J?~^^J555Y?.   ::.
.!~.       ..!7:     ^!YGBBB#B!    .:^^::......~JJ?~..:^:^!!^^~!77J55?. .:::.
.~~.      :J7?!:    ~J5GGGPJ7J?:..:::^^^^^^:::.:!??7~^~~~~~!!7~^~77?JY?~:.
.^!.      !~..  .^!YGYJ5GGP55PJ^.  ...::^^^.    .^^!!: .:~!!^.   .~~!!77^
.:!^.    ^J~^^~?5GGPPY?JYPGG5?:..                .^^:.. ..::::^:....~~:^!^.
..~!^...:~7??7!7!~^::....!?7~:.  ........:::^~^:^^^^^^~~^~~~~~~~~^^^::~^?YY7:
.:~7!!!7J?~^.      ..:~~^^^:.......::...::....  .:^^^^..              ~!JJ~YY?~^
..:!7?JJ?!^:          .^~!^.                    :^^:.^~~~^.          .:!57 ^?J?!
   .....                 :^:... .....  .:    .!YPJ~:^!7?JJ?77!!!!~!7!7?5J.  !YYJ
                          .7???77!!!!!~7Y?77JGBG55J~:...^!JJJJ?!!!77!!?J~^~7?JY5
                           ~JYY5YJ7777!?JYYY!7?Y5G5^.    .7JJJ7!~!?????777!!~^^:
                           :7Y?!J?~^:::^!~777J5PPP!.     ~???7~^::^^::..
                          .^!77?YY7~~^^~?J5GGGG5J!.      .:.:.
                         .~!~~^~~~~::::.^^~7?7!^
           .:::::::.
                  .:^.      ....:~~^.               :~:
                   .!7!^:::.::::^~~!^.               :!!^.
                 ^!???7^.::^^^^~7!~^^^:          ^^:^^^7J?^
                .::.::!^:......:~~^^~^^:         ^JJJYJ????^
                ::^^^:~^::...:^~^:...^~~~^^:.:^.:.^!?~:.
                .:!7??7~:....      ..:.::....       :.
                    .~~.           .~~.      ::....~!7?~
                     :7!!~~~:::...^!777!^:::!!!!:..7JJYY?~:
                   .^!~^:^!7~:!~:. ..:::.. .!!!~:   ^!?J?!^
                ..^~^::::~77!:~??7!^.:^!!!^ :!^::.......
             .~7?J?7!!!~~!77!::^!!!!....^7!::^:::~7?7^
              .^~!?JJ?!^^~^:.   :^::.            :^~7^
                   :^^:.                      .::
                                            .. :!!~:
                    ..:::..               .     ~777~.
                  .^?Y??~^^~:.   . .^^.  ~?!:...^7?77!^
       .........^?YYJJ?7!~!7!77~::::^~~!!77?!~~^~!!7777^
      .........^?J?!^!?JY?7J7!^:..    .:~~^:~!!~^:^!!!!^
    ....        .:!7~~~!J5Y7!!^::..::  .^!^..::^~!~.^^.
           ..::..:. :!!~^~7?J7~~^^:...  .^??!~!!7JJ!:
                .~77^.^^.   .^.  .:..     .^!77?5YP5J~
                  ^J5?:!7!^::....  ...       ..:Y5PPP57:
                   .JGY^?5Y^:~!!7~^:^^^~7?JYJY5PPP5YPPP5?^
                    :?J!^YPJ^..^~!7JJJ!!7??5P5YJ??J5PPPP57.
                  .::~777J5PPJ:.  ...^!7???JJJJJYJJ5PPY7:
               ..^~!JJ?7~.:^~^^^~~~~~~~~~^^~~~!77?7!!^.
                  .^7?777!^    ..:^^.
..:^..              .^^!!~~^:.
JY5P557.
.:7PP5P5~                                    .:.
^~JY??P5Y7                                    .^^^^::.
?!^^~JP7..         ...:^^^:::.....              ^!!!!!~~^^:.       .......
!JYYJ!:        ..:^~~~!~~~~77!!!!!^:............:~~^^~~!!7!!~:..^!???????77~:
             .:^^^~~^::...::::::^::::.......   ...:^^^^^^:.    ^7?????7!?JJJ?7~^
^:....::^:^^~!!!!!!~^^^!!!!!!!!^.....:^^^^~~:......~~^:.       :!~. :!: !JJ?!^:.
^~!~!!!~~^^^^:::...    ......:..........:^^^^.  ....~~.        .^:   :..7J!:
  ...::     ...                                     .~!~.            ...!:
                ..:::~^.         .                    .::              .
                    .!Y?^....  ..::.......:.
                      755YJJJ7!!!!~:::^^^~77!!~^^::.
                     .!JPPPPPY!!~~~::..:^^~~!7!~~!!!!!:
                    :7JJYJ?7JJ^^:........^~~~!!^^~~~?JJ^
               .::^!??7?JJJ?J7^^......:^~!~^^^~!~:..!?JYJ7:
        ......:^7?JJJJJJ?!~^:..    ...  :::::...:^!?YYYYY7~.
                 .^^::..::::.         .    .~7?7?JYJYYYY7^
                     ....               :~:^7Y5JJ?~~?YJ7:
                        ....              ..7Y5?~~7YY?^.
                           :^^.             ~J77!:.~!:
                :~~~^::.     .:.           :~!!!:  .:.
                 :^!J55YJ?~!!~^:.. .:^~!!!!!!~......
                    ^?5PY?~^!?!~^^~?JYY5YJ?7:.~7??~!:
                    .J5?J5!!!~^^::^~!!JY?!!!!JYYJ~~J!
                  ^7??~:7J7!:.:::.^^~!!!^^^^7YJ!^^~?J!
           ...^~~!?7!~!!7!~^...::^^^::^:^?JYY?!77^.!JJ7:
          ...~7?JYYJ7~^::..     ..:^^::..:. .  ..:!JYJJ?~.
                .:::...              .::!!!~~:~!?JYYJJJ?^.
                        ...           ..~J5PY!?JJJJJJ777.
                          .::             .?57^^^~?J?7^.
                            .              .JY?~^^::.
                                            ::.
                                                ..
                  :::..                        .^!??!^.
                    ..:~^:.            ...   ....:!Y55J7~:.
                       !YYJJ?!^......^!JYJ!~^^^:^^::75PPPPY?!!~.
                  .:^~7J555PPPY^::^^^!?JJ7!:     ....:?PPPPY5P5J!:
           ....:~!7J55YYY77?~:. ....^?J?!^...:...      !55Y^.!YP5J!:.
            ...^~!77!!^:~7??JJ!~:::?5Y7~:....:^~~~^.   .JYJ~. :?JY5YJ?~:.
      .:::.       .:~?YJJJ55?!^....^!:          .~?7^::~7~^~!~^^..:::^~:.
      .:::.           ^7YY!^.                     ~??7^:.
       ...              :7?7!~^..... ...         .~!!??!:.
                     ........:^::::.. ..    .....    .^~^::.
             ..:^::^::.......               ...
            .^~^:....:~?YY7:                 :^:.::.
                       .~Y5Y7^:...    :~:     .::~?7~:
                 .:^^^.  :77?7!!~^:...~~.       .7J7??!^.
                 ...     :!7!~..^^~!!:.         :^^^^~~^..
                        .7?J??.    .!7^.     :~~:..:::..
                      .^~!!~7?^     .!7^      :!JJ7!~:.
                ..::~77?JYY557:..    ..~^.      !JJ7.
           .^7??JJ???777!~~7?~.        .!^:.....~?J7.
           .:^^^^~7????JJYJ?~       .^:^^:....:::~?~
                  ..:^^~~!JJ7~..   .^~~:       .:~7^..  .
                          ...^~^.                ::.^7!!~::.
                              :!!.                   ::.
                                ::
`}</pre>
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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/MAPLESMOKE.json")
      .then((response) => response.json())
      .then((data) => setData(data));
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
      {access === 3 ? (
        <AccessScreen
          access="3"
          accessLabel="TOP SECRET//SAR-MULTIPLE PROGRAMS//WAIVED"
          data={data}
        />
      ) : access === 2 ? (
        <AccessScreen
          access="2"
          accessLabel="TOP SECRET//SAR-MAPLE SMOKE/SAR-SILENT TUNE"
          data={data}
        />
      ) : access === 1 ? (
        <AccessScreen
          access="1"
          accessLabel="SECRET//SPECIAL ACCESS REQUIRED-SILENT TUNE"
          secretCode="CERULEAN LIBRARY"
          data={data}
        />
      ) : (
        <MainScreen selectedImages={selectedImages} handleClick={handleClick} />
      )}
    </>
  );
}

export default EmojiPassword;
