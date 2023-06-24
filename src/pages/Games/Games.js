import React, { Suspense } from "react";
import "./Games.css";
import emblem from "./../../assets/images/games/emblem.png";
const SkewDiv = React.lazy(() => import("../../components/items/SkewDiv"));

const gameData = [
  {
    imgSrc: "img/0dg/tile-ba.png",
    dest: "/0dg/banjos-arcade",
    title: "Banjo's Arcade",
    description: "Retro-remake collection.",
  },
  // Add more game data objects here as needed
];

function Games() {
  return (
    <section>
      <header>
        <h1>
          <span>0DG</span>
        </h1>
      </header>

      <div className="overview-container">
        <div className="overview">
          <h2>Cutting-Edge Throwbacks</h2>
          <p>
            Rooted in the vision of a solo dev, <span>0DGames</span> brings to
            life action games that stand out. I'm dedicated to crafting
            experiences characterized by unique artwork, precise controls, and
            compelling mechanics, which stretch the imagination and challenge.
            For the casual gamer looking for a fun diversion, and the elite
            player seeking to uncover advanced techniques, 0DGames has something
            for you.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="emblem">
            <img src={emblem} alt="0DG Emblem" loading="lazy" />
          </div>
        </Suspense>
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
  );
}

export default Games;
