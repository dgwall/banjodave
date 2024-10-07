import React from "react";
import { Link } from "react-router-dom";
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
        </article>
      </section>

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
          <iframe title="itch.io" frameborder="0" src="https://itch.io/embed/2773246?linkback=true&amp;border_width=3&amp;bg_color=e8cf1b&amp;fg_color=222222&amp;link_color=fc5c00&amp;border_color=333333" width="556" height="171" className="itch-embed"><a href="https://banjodave.itch.io/banjos-arcade">Banjo's (Abandoned) Arcade by BanjoDave</a></iframe>
        </div>
        <div className="game-cover">
          <a href="https://banjodave.itch.io/banjos-arcade" target="_blank" rel="noreferrer">
          <img
            src="/img/0dg/tile-ba.png"
            alt="Banjo's Arcade Cover"
            loading="lazy"
          />
          </a>
        </div>
      </div>




      <header>
        <h1>
          <Link to="../0dgames">
            <img
              src="/img/0dg/0DG.png"
              alt="[0D]Games Logo"
              height="100px"
              loading="lazy"
              style={{ float: "right", margin: "2rem", opacity: "0.5" }}
            />
            </Link>
        </h1>
      </header>
    </section>
  );
}

export default BanjosArcade;
