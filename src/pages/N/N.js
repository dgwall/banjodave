import React from "react";
import "./N.css";
import { Routes, Route } from "react-router-dom";
import NMapOrganiser from "../../components/menus/NMapOrganiser/NMapOrganiser";

function N() {
  const dataSource = process.env.PUBLIC_URL + "/nMapData.json";

  return (
    <section>
      <header className="under-construction">Under Construction</header>
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <article>
              <header>N Maps by DW40</header>
              <div className="overview">
                <img
                  src="/img/n/nv14.png"
                  alt="N v1.4 by Metanet Software"
                  loading="lazy"
                />
                <div>
                  <p>
                    In{" "}
                    <a
                      href="https://www.thewayoftheninja.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      N
                    </a>{" "}
                    by{" "}
                    <a
                      href="https://www.metanetsoftware.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Metanet Software
                    </a>
                    , you step into the agile shoes of a ninja, gifted with
                    unparalleled speed, dexterity, and a lifespan of 1.5
                    minutes. Your world is a universe governed by physics, where
                    momentum is your ally and trajectory your guiding star.
                    Amidst your fleeting existence, you are called upon to
                    navigate through rooms teeming with lethal robotic
                    adversaries and an array of hazards, while always seeking
                    the allure of gold.
                  </p>
                  <p>
                    The heart of N beats in its vibrant community, where
                    disciples of the game exercise their creativity in crafting
                    and sharing custom maps to{" "}
                    <a
                      href="https://www.nmaps.net/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      NUMA
                    </a>
                    . These user-generated levels add a spectrum of novel
                    challenges, turning this platformer into an ever-evolving
                    digital playground where each new map is a testament to the
                    collective creativity and ingenuity of its players.
                  </p>
                  <p>
                    The maps on this website and on NUMA are designed for
                    version 1.4 of the game, released in 2005. You can find a
                    free download of this version here: &gt;&gt;{" "}
                    <a href="n_v1pc.zip" title="n_v1pc.zip 1.26 MB" download>
                      Download N v1.4 for PC
                    </a>{" "}
                    &lt;&lt;
                  </p>
                </div>
              </div>
              <div className="hr"></div>
              <NMapOrganiser dataSource={dataSource} />
            </article>
          }
        />
        <Route
          path=":productId"
          element={<NMapOrganiser dataSource={dataSource} />}
        />
      </Routes>
    </section>
  );
}

export default N;
