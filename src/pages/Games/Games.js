import React, { Suspense } from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";
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
        <title>[0D]Games on BanjoDave.com</title>
      </Helmet>
      <section>
        <header>
          <h1>
            <span>[0D]Games</span>
          </h1>
        </header>

        <div className="overview-container">
          <div className="overview">
            <h2>Cutting-Edge Throwbacks</h2>
            <p>
              Stretching the imagination with unique action games. For the both
              the casual gamer looking for fun, and the elite player seeking to
              uncover advanced techniques and beat their highscore,{" "}
              <span>[0D]Games</span> has something for you.
            </p>
          </div>
          <div className="emblem">
            <img src={emblem} alt="[0D]Games Emblem" loading="lazy" />
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
