import React, { Suspense } from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/0DG.png";
import { Helmet } from "react-helmet";
const SkewDiv = React.lazy(() => import("../../components/items/SkewDiv"));

const gameData = [
  {
    imgSrc: "/img/0dg/tile-ba.png",
    dest: "/0dg/banjos-arcade",
    title: "Banjo's Arcade",
    description: "Retro-remake collection.",
  },
  {
    imgSrc: "/img/orb_invert.gif",
    dest: "/0dgames/",
    title: "More Coming Soon",
    description: "TBA",
  },
];

function Games() {
  return (
    <>
      <Helmet>
        <title>[0D]Games on BanjoDave.co.uk</title>
      </Helmet>
      <section>
        <div className="overview-container">
          <div className="overview">
            <h2>Cutting-Edge Throwbacks</h2>
            <p>
              <span>[0D]Games</span> is striving to create games fun for both the casual player and those seeking to uncover advanced techniques and strategies.
            </p>
          </div>
          <div className="emblem">
            <img src={emblem} alt="Logo of [0D]Games featuring a stylized depiction of a retro game cartridge. The central part shows the text '[0D] GAMES' in bold, yellow letters on a dark gradient background, resembling classic cartridge designs. The logo has a distinct rectangular shape with rounded corners and golden pins at the bottom, evoking nostalgia for vintage gaming hardware." loading="lazy" />
          </div>
        </div>

        <section className="content">
          <article>
            <div className="game-tiles">
              <Suspense fallback={<div>Loading...</div>}>
                {gameData.map((game) => (
                  <SkewDiv
                    key={game.title}
                    dest={game.dest}
                    imgSrc={game.imgSrc}
                    altText={game.title}
                    title={game.title}
                    description={game.description}
                  />
                ))}
              </Suspense>
            </div>
          </article>
        </section>
      </section>
    </>
  );
}

export default Games;
