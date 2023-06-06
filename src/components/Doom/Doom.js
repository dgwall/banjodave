import React from "react";
import "./Doom.css";
import banner from "../../assets/images/doom/banner.jpg";

function Doom() {
  return (
    <section>
      <header>
        <nav>
          <a href="#starlit-abyss">Starlit Abyss</a>&bull;
          <a href="#more">More Maps</a>
        </nav>
        <h1>BanjoDOOM</h1>
      </header>
      <img
        src={banner}
        alt="Screenshot of Blazing Beachhead"
        className="banner"
      />
      <div className="container">
        <article>
          <h2 id="starlit-abyss">
            Starlit Abyss <br />
            <span>Ultimate DOOM Episode</span>
          </h2>
          <div>
            Ready to dance with demons on the edge of the Starlit Abyss? This
            full-blown Ultimate DOOM episode is set to blast onto the scene,
            teeming with gnashing teeth, hellfire, and enough firepower to make
            a Cyberdemon blush. While the full release will be yours to wreak
            havoc with for free, the brave souls who can't resist an early foray
            into the abyss can subscribe to the BanjoDave Patreon, granting you
            exclusive access to individual maps as they roll hot off the anvil.
            Strap up, marine, and dive headfirst into this blood-soaked classic
            DOOM adventure. The abyss beckons... are you ready to answer its
            call?
          </div>
          <button className="under-construction">
            Early Access on Patreon!
          </button>
        </article>
        <article id="more" className="under-construction">
          <h2>More Maps</h2>
          <div>Cards. Overview, screenshots, downloads.</div>
        </article>
      </div>
    </section>
  );
}

export default Doom;
