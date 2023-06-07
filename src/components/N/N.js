import React from "react";
import { Link } from "react-router-dom";
import "./N.css";

function N() {
  return (
    <section>
      <header>N Maps by DW40</header>
      <div className="overview">
        <img src="./img/n/nv14.png" alt="N v1.4 by Metanet Software" />
        <div>
          <p>
            In N v1.4 by{" "}
            <a
              href="https://www.metanetsoftware.com/"
              target="_blank"
              rel="noreferrer"
            >
              Metanet Software
            </a>
            , you step into the agile shoes of a ninja, gifted with unparalleled
            speed, dexterity, and a lifespan of 1.5 minutes. Your world is a
            universe governed by physics, where momentum is your ally and
            trajectory your guiding star. Amidst your fleeting existence, you
            are called upon to navigate through rooms teeming with lethal
            robotic adversaries and an array of hazards, while always seeking
            the allure of gold.
          </p>
          <p>
            The heart of N v1.4 beats in its vibrant community, where disciples
            of the game exercise their creativity in crafting and sharing custom
            maps to{" "}
            <a href="https://www.nmaps.net/" target="_blank" rel="noreferrer">
              NUMA
            </a>
            . These user-generated levels add a spectrum of novel challenges,
            turning this platformer into an ever-evolving digital playground
            where each new map is a testament to the collective creativity and
            ingenuity of its players.
          </p>
        </div>
      </div>
      <div className="under-construction">
        <div>
          <Link to="/n/rootootoot">rootootoot</Link>
        </div>
        <div>
          <Link to="/n/sol">Sol</Link>
        </div>
        <div>
          <Link to="/n/plusplus">N++</Link>
        </div>
        <div>
          <Link to="/n/dw40">Complete Works of DW40</Link>
        </div>
      </div>
    </section>
  );
}

export default N;
