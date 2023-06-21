import React from "react";
import { Link } from "react-router-dom";
import "./N.css";

function N() {
  return (
    <section>
      <header>N Maps by DW40</header>
      <div className="overview">
        <img
          src="./img/n/nv14.png"
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
            , you step into the agile shoes of a ninja, gifted with unparalleled
            speed, dexterity, and a lifespan of 1.5 minutes. Your world is a
            universe governed by physics, where momentum is your ally and
            trajectory your guiding star. Amidst your fleeting existence, you
            are called upon to navigate through rooms teeming with lethal
            robotic adversaries and an array of hazards, while always seeking
            the allure of gold.
          </p>
          <p>
            The heart of N beats in its vibrant community, where disciples of
            the game exercise their creativity in crafting and sharing custom
            maps to{" "}
            <a href="https://www.nmaps.net/" target="_blank" rel="noreferrer">
              NUMA
            </a>
            . These user-generated levels add a spectrum of novel challenges,
            turning this platformer into an ever-evolving digital playground
            where each new map is a testament to the collective creativity and
            ingenuity of its players.
          </p>
          <p>
            The maps on this website and on NUMA are designed for version 1.4 of
            the game, released in 2005. You can find a free download of this
            version here: &gt;&gt;
            <a href="n_v1pc.zip" title="n_v1pc.zip 1.26 MB" download>
              Download N v1.4 for PC
            </a>
            &lt;&lt;
          </p>
        </div>
      </div>
      <h2>Map Packs</h2>
      <div className="panels">
        <div>
          <Link to="/n/rootootoot">
            <img
              src="img/n/panel-rootootoot.jpg"
              alt="rootootoot: 500 maps by DW40 for N v1.4"
              loading="lazy"
            />
            <br />
            <span>rootootoot</span>
          </Link>
          <br />
          500+ of my best maps in one package.
        </div>
        <div>
          <Link to="/n/sol">
            <img src="img/n/panel-sol.jpg" alt="Sol+144*10mm" loading="lazy" />
            <br />
            <span>Sol+144*10mm</span>
          </Link>
          <br />
          NEW maps for 2023. Coming soon.
        </div>
        <div>
          <Link to="/n/dw40">
            <img
              src="img/n/panel-complete.jpg"
              alt="Complete Works of DW40"
              loading="lazy"
            />
            <br />
            <span>Complete Works of DW40</span>
          </Link>
          <br />
          The best (and worst) of DW40, dating back to '07.
        </div>
        <div>
          <Link to="/n/plusplus">
            <img src="img/n/panel-nplusplus.jpg" alt="N++" loading="lazy" />
            <br />
            <span>N++</span>
          </Link>
          <br />
          The ultimate up-to-date version of N.
        </div>
      </div>
    </section>
  );
}

export default N;
