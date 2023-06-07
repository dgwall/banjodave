import React from "react";
import "./Doom.css";
import banner from "../../assets/images/doom/banner.jpg";

function Doom() {
  return (
    <section>
      <header>
        <nav>
          <a href="#starlit-abyss">Starlit Abyss</a>&bull;
          <a href="#more">More</a>
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
            classic 9-map Ultimate DOOM episode is set to blast onto the scene,
            seething with infernal fiends, scorching hellfire, and enough
            firepower to make a Cyberdemon blush. While the full release will be
            yours to wreak havoc with for free, the brave souls who can't resist
            an early foray into the abyss can subscribe to the{" "}
            <a href="#maincontent" className="under-construction">
              BanjoDave Patreon
            </a>
            , granting you exclusive access to individual maps as they roll hot
            off the anvil. I will also be posting regular development updates to
            my{" "}
            <a
              href="https://www.twitter.com/banjeetz"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            . The abyss beckons... are you ready to answer its call?
          </div>
          <div className="dev-progress">
            <p>
              <b>Development</b>
            </p>
            <p>E1M1: Deep Space Telemetry [IN PROGRESS]</p>
            <p>E1M2: Eldritch Nexus of the Eternal Furnace [COMING SOON]</p>
            <p>E1M3: [TBA]</p>
          </div>
          <div className="button">
            <button className="under-construction">
              Early Access on Patreon!
            </button>
          </div>
        </article>
        <article id="more" className="under-construction">
          <h2>More Maps</h2>
          <div>Cards. Overview, screenshots, downloads.</div>
          <ul>
            <li>Deep Underground Military Bunker</li>
            <li>Blazing Beachhead</li>
            <li>Ascent to Valhalla</li>
            <li>MALAGARD</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Doom;
