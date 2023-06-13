import React from "react";
import "./Games.css";
import SkewDiv from "./SkewDiv";

const gameData = [
  {
    stage: "cs",
    imgSrc: "/img/0dg/banner-kosopt.png",
    dest: "/0dg/banjos-arcade",
    title: "Kósmoptasía (alpha)",
    description:
      "Navigate, Thrive, and Survive in a Chaotic Cosmic Playground!",
  },
  {
    stage: "free",
    imgSrc: "/img/0dg/banner-navexe.png",
    dest: "/0dg/banjos-arcade",
    title: "notavirus.exe (beta)",
    description:
      "Embrace the Chaos: Firewall Frenzy and Digital Destruction Await!",
  },
  {
    stage: "free",
    imgSrc: "/img/0dg/banner-hiecom.png",
    dest: "/0dg/banjos-arcade",
    title: "Hierophant Commandant (beta)",
    description:
      "Where Faith Meets Firepower: Defend the Divine, One Ghost at a Time!",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/tile-ba-.png",
    dest: "/0dg/banjos-arcade",
    title: "LAUNCH PACK",
    description: "Coming Soon. First three games with special features.",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/tile-ba-.png",
    dest: "/0dg/banjos-arcade",
    title: "MEGA PACK",
    description: "3 new games",
  },
  {
    stage: "tba",
    imgSrc: "/img/0dg/tile-ba-.png",
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

function BanjosArcade() {
  return (
    <section>
      <header>
        <h1>
          <span>0DG</span>
        </h1>
      </header>

      <div className="overview-container">
        <div className="overview">
          <h2>
            <img src="/img/0dg/banner-ba.png" alt="Banjo's Arcade Banner" />
          </h2>
          <p>
            Prepare to reignite your passion for classic gaming with Banjo's
            Arcade, a treasure trove of retro-remakes delivered straight to your
            Windows device! Dive into "Hierophant Commandant," defending your
            village with a barrage of golden cross missiles against spectral
            invasions, or unleash havoc in "notavirus.exe," embodying a
            relentless virus tearing through a digital landscape, collecting
            power-ups and defying firewalls in a game that reimagines Arkanoid
            for the digital frontier. And hold your breath for "Kósmoptasía," my
            nebulous new addition. A neon-soaked ride down the pixelated path of
            retro glory!
          </p>
          <img src="../img/orb.gif" alt="Under Construction" />
        </div>
        <div className="emblem">
          <img src="/img/0dg/tile-ba.png" alt="Banjo's Arcade Cover" />
        </div>
      </div>

      <section className="content">
        <article>
          <div className="game-tiles">
            {gameData
              .filter((game) => game.stage === "free" || game.stage === "cs")
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
          <div className="game-tiles">
            {gameData
              .filter((game) => game.stage === "tba")
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
        </article>
      </section>
    </section>
  );
}

export default BanjosArcade;
