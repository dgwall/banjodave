import React from "react";
import "./Games.css";
import SkewDiv from "./SkewDiv";

const gameData = [
  {
    imgSrc: "/img/0dg/banner-hiecom.png",
    dest: "/0dg/banjos-arcade",
    title: "Hierophant Commandant [BETA]",
    description:
      "Where Faith Meets Firepower: Defend the Divine, One Ghost at a Time!",
  },
  {
    imgSrc: "/img/0dg/banner-navexe.png",
    dest: "/0dg/banjos-arcade",
    title: "notavirus.exe [BETA]",
    description:
      "Embrace the Chaos: Firewall Frenzy and Digital Destruction Await!",
  },
  {
    imgSrc: "/img/0dg/tile-ba-kosopt.png",
    dest: "/0dg/banjos-arcade",
    title: "Kósmoptasía [ALPHA]",
    description:
      "Navigate, Thrive, and Survive in a Chaotic Cosmic Playground!",
  },
  {
    imgSrc: "img/0dg/tile-ba-.png",
    dest: "/0dg/banjos-arcade",
    title: "MEGA PACK",
    description: "TBA",
  },
  {
    imgSrc: "img/0dg/tile-ba-.png",
    dest: "/0dg/banjos-arcade",
    title: "ULTRA PACK",
    description: "TBA",
  },
  {
    imgSrc: "img/0dg/tile-ba-.png",
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
            Prepare to reignite your passion for gaming with Banjo's Arcade, a
            treasure trove of retro-remake classics delivered straight to your
            Windows device! Dive into "Hierophant Commandant," defending your
            village with a barrage of golden cross missiles against spectral
            invasions, or unleash havoc in "notavirus.exe," embodying a
            relentless virus tearing through a digital landscape, collecting
            power-ups and defying firewalls in a game that reimagines Arkanoid
            for the digital frontier. And hold your breath for "Kósmoptasía," my
            nebulous new addition. A neon-soaked ride down the pixelated path of
            retro glory!
          </p>
        </div>
        <div className="emblem">
          <img src="/img/0dg/tile-ba.png" alt="Banjo's Arcade Cover" />
        </div>
      </div>

      <section className="content">
        <article>
          <div className="game-tiles">
            {gameData.map((game, index) => (
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
