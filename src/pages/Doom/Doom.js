import React, { useState } from "react";
import "./Doom.css";
//import ScreenshotsCarousel from "../../components/modals/ScreenshotsCarousel";
import gargoyleA from "../../assets/images/doom/icon-1.webp";
import gargoyleB from "../../assets/images/doom/icon-2.webp";
import { Helmet } from "react-helmet";

function Doom() {
  const [cards, setCards] = useState([
    {
      id: "dumb",
      title: "Deep Underground Military Bunker",
      requirements: "Requires: GZDoom, OTEX",
      desc: "A strange mist is making people crazy in this secret base, and your prison door just unlocked itself.",
      href: "https://s3.eu-north-1.amazonaws.com/banjodave.com/doom/DUMB.pk3",
      downloadLabel: "DUMB.pk3 18.1 MB",
      buttonLabel: "Download .pk3",
      hover: false,
      videoLoaded: false,
    },
    {
      id: "bb",
      title: "Blazing Beachhead",
      requirements: "Requires: GZDoom, OTEX",
      desc: "An expansive magma shoreline with hordes of modded enemies.",
      href: "https://s3.eu-north-1.amazonaws.com/banjodave.com/doom/BanjoDave_Blazing-Beachhead.wad",
      downloadLabel: "BanjoDave_Blazing-Beachhead.wad 5.62 MB",
      buttonLabel: "Download .wad",
      hover: false,
      videoLoaded: false,
    },
    {
      id: "atv",
      title: "Mapwich 2: Ascent to Valhalla",
      desc: "Climb storm-lashed cliffs on your way to a monumental fortress. Collab with Danlex.",
      href: "https://www.doomworld.com/forum/topic/117485-come-eat-the-mapwich-2-public-beta-out-now/",
      buttonLabel: "Doomworld Thread",
      hover: false,
      videoLoaded: false,
    },
    {
      id: "m",
      title: "MALAGARD",
      desc: "Navigate the mysterious ruins and bulwarks on a demon-infested island.",
      href: "https://www.doomworld.com/forum/topic/110861-malagard-single-map-for-doom-ii/",
      buttonLabel: "Doomworld Thread",
      hover: false,
      videoLoaded: false,
    },
  ]);

  function handleMouseEnter(id) {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, hover: true, videoLoaded: true }
          : { ...card, hover: false }
      )
    );
  }

  function handleMouseLeave(id) {
    setCards(cards.map((card) => ({ ...card, hover: false })));
  }

  return (
    <>
      <Helmet>
        <title>BanjoDOOM</title>
      </Helmet>
      <section>
        <header>
          <nav>
            <a href="#more">Selected Maps</a>&bull;
            <a href="#starlit-abyss">Starlit Abyss</a>
          </nav>
          <h1>BanjoDOOM</h1>
        </header>
        <img
          srcSet="
      /img/doom/banner-min.jpg 768w,
      /img/doom/banner.png 1280w"
          sizes="(max-width: 768px) 768px, 1280px"
          src="/img/doom/banner.png"
          alt="Screenshot of Blazing Beachhead"
          className="banner"
          loading="lazy"
        />
        <div className="container">
          <article id="more">
            <h2>
              <img src={gargoyleB} alt="Satyr Gargoyle" loading="lazy" />
              <div>
                Selected Maps
                <br />
                <span>From Various Projects</span>
              </div>
            </h2>
            <div className="doom-cards">
              {cards.map((card) => (
                <div
                  className="card"
                  id={card.id}
                  key={card.id}
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, transparent 66.6%, black), url('/img/doom/card-${card.id}.jpg')`,
                  }}
                  onMouseEnter={() => handleMouseEnter(card.id)}
                  onMouseLeave={() => handleMouseLeave(card.id)}
                >
                  <div className="video-dimmer"></div>
                  <div
                    className={`card-video ${card.hover ? "video-active" : ""}`}
                  >
                    {card.videoLoaded && (
                      <video
                        src={`/vid/doom/${card.id}.webm`}
                        muted
                        loop
                        autoPlay
                        playsInline
                      >
                        <img src="/img/orb_small.gif" alt="loading..." />
                      </video>
                    )}
                  </div>
                  <div className="card-container">
                    <h3>{card.title}</h3>
                    {card.requirements && (
                      <p className="card-requirements">{card.requirements}</p>
                    )}
                    <p className="desc">{card.desc}</p>
                    {card.downloadLabel ? (
                      <a href={card.href} title={card.downloadLabel} download>
                        <button>{card.buttonLabel}</button>
                      </a>
                    ) : (
                      <a href={card.href} target="_blank" rel="noreferrer">
                        <button>{card.buttonLabel}</button>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              <p className="more-desc">DOOM2.WAD required</p>
            </div>
          </article>

          <article id="starlit-abyss">
            <h2>
              <img src={gargoyleA} alt="Lion Gargoyle" loading="lazy" />
              <div>
                Starlit Abyss
                <br />
                <span>Ultimate DOOM Episode</span>
              </div>
            </h2>
            <div className="feature">
              <div>
                <p>
                  Ready to dance with demons on the edge of the Starlit Abyss?
                  Well too bad because the stage isn't set yet.
                </p>
                <p className="p-desc">DOOM.WAD required</p>
                <div className="dev-progress">
                  <ul>
                    <li>
                      <b>Development</b>
                    </li>
                    <li>E1M1: Deep Space Telemetry [IN PROGRESS]</li>
                    <li>
                      E1M2: Eldritch Nexus of the Eternal Furnace [COMING SOON]
                    </li>
                    <li>E1M3: [TBA]</li>
                  </ul>
                </div>
              </div>
            </div>
            {/*
          <div className="button">
            <button className="under-construction">
              Early Access on Patreon!
            </button>
          </div> */}
          </article>
        </div>
      </section>
    </>
  );
}

export default Doom;
