import React from "react";
import "./Games.css";
//import SkewDiv from "../../components/items/SkewDiv";
/*
const gameData = [
  {
    stage: "cs",
    imgSrc: "/img/0dg/cart-blank.png",
    dest: "/0dg/banjos-arcade",
    title: "Kósmoptasía alpha",
    description:
      "Navigate, Thrive, and Survive in a Chaotic Cosmic Playground!",
  },
  {
    stage: "free",
    imgSrc: "/img/0dg/cart-navexe-beta.png",
    dest: "/0dg/banjos-arcade",
    title: "notavirus.exe beta",
    description:
      "Embrace the Chaos: Firewall Frenzy and Digital Destruction Await!",
  },
  {
    stage: "free",
    imgSrc: "/img/0dg/cart-hiecom-beta.png",
    dest: "/0dg/banjos-arcade",
    title: "Hierophant Commandant beta",
    description:
      "Where Faith Meets Firepower: Defend the Divine, One Ghost at a Time!",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/box-ba-lp.jpg",
    dest: "/0dg/banjos-arcade",
    title: "LAUNCH PACK",
    description: "Coming Soon. First three games with special features.",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/box-ba-blank.jpg",
    dest: "/0dg/banjos-arcade",
    title: "MEGA PACK",
    description: "3 new games",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/box-ba-blank.jpg",
    dest: "/0dg/banjos-arcade",
    title: "ULTRA PACK",
    description: "3 new games",
  },
  {
    stage: "tba",
    imgSrc: "/img/orb.gif",
    dest: "/0dg/banjos-arcade",
    title: "???",
    description: "TBA",
  },
  // Add more game data objects here as needed
];
*/
function BanjosArcade() {
  return (
    <section>
      <header>
        <h1>
          <span>[0D]Games</span>
        </h1>
      </header>

      <div className="overview-container">
        <div className="overview">
          <h2>
            <img
              src="/img/0dg/banner-ba.png"
              alt="Banjo's Arcade Banner"
              loading="lazy"
            />
          </h2>
          <p>
            Prepare to reignite your passion for classic gaming with{" "}
            <span>Banjo's Arcade</span>, a treasure trove of retro-remakes
            delivered straight to your PC!
          </p>
          <p>
            Dive into <span>Hierophant Commandant,</span> defending your village
            with a barrage of golden cross missiles against spectral invasions
          </p>
          <p>
            Unleash havoc in <span>notavirus.exe,</span> embodying a relentless
            virus tearing through a digital landscape, collecting power-ups and
            defying firewalls in a game that reimagines Arkanoid.
          </p>
          <p>
            Don't hold your breath for <span>Kósmoptasía,</span> a nebulous new
            addition, because it's not coming out.
          </p>
        </div>
        <div className="emblem">
          <img
            src="/img/0dg/tile-ba.png"
            alt="Banjo's Arcade Cover"
            loading="lazy"
          />
        </div>
      </div>

      <section className="content">
        <article>
          <div className="preview-container">
            <iframe
              src="https://www.youtube.com/embed/KZnIY07b3-Q"
              title="YouTube video player"
              frameborder="0"
              className="preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            >
              <img
                src="/portfolio/img/project-ba.png"
                alt="Banjo's Arcade Screenshots"
              />
            </iframe>
          </div>
          <h1 className="under-construction">Under Construction</h1>

          {/*
          <div className="game-tiles">
            {gameData
              .filter((game) => game.stage === "free")
              .map((game, index) => (
                <SkewDiv
                  key={index}
                  dest={game.dest}
                  imgSrc={game.imgSrc}
                  altText={game.title}
                  title={game.title}
                  description={game.description}
                />
              ))}
              </div>
              */}
        </article>
      </section>
    </section>
  );
}

export default BanjosArcade;
