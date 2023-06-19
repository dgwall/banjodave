import React from "react";
import "./Doom.css";
import ScreenshotsCarousel from "../../components/shared/ScreenshotsCarousel";
import screensSA from "./screensSA.json";
import banner from "../../assets/images/doom/banner.jpg";
import gargoyleA from "../../assets/images/doom/icon-1.png";
import gargoyleB from "../../assets/images/doom/icon-2.png";

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
        <article id="more">
          <h2>
            <img src={gargoyleB} alt="Satyr Gargoyle" />
            <div>
              Single Maps
              <br />
              <span>From Various Projects</span>
            </div>
          </h2>
          <div className="doom-cards">
            <div className="card" id="dumb">
              <h3>Deep Underground Military Bunker</h3>
              <p className="card-requirements">Requires: GZDoom, OTEX</p>
              <p className="desc">
                A strange mist is making people crazy in this secret base, and
                your prison door just unlocked itself.
              </p>
              <a
                href="https://s3.eu-north-1.amazonaws.com/banjodave.com/doom/DUMB.pk3"
                title="DUMB.pk3 18.1 MB"
                download
              >
                <button>Download .pk3</button>
              </a>
            </div>
            <div className="card" id="bb">
              <h3>Blazing Beachhead</h3>
              <p className="card-requirements">Requires: GZDoom, OTEX</p>
              <p className="desc">
                An expansive magma shoreline with hordes of modded enemies.
              </p>
              <a
                href="https://s3.eu-north-1.amazonaws.com/banjodave.com/doom/BanjoDave_Blazing-Beachhead.wad"
                title="BanjoDave_Blazing-Beachhead.wad 5.62 MB"
                download
              >
                <button>Download .wad</button>
              </a>
            </div>
            <div className="card" id="atv">
              <h3>Ascent to Valhalla</h3>
              <p className="desc">Collab with Danlex for Mapwich 2.</p>
              <a
                href="https://www.doomworld.com/forum/topic/117485-come-eat-the-mapwich-2-public-beta-out-now/"
                target="_blank"
                rel="noreferrer"
              >
                <button>Doomworld Thread</button>
              </a>
            </div>
            <div className="card" id="m">
              <h3>MALAGARD</h3>
              <p className="desc">My first release!</p>
              <a
                href="https://www.doomworld.com/forum/topic/110861-malagard-single-map-for-doom-ii/"
                target="_blank"
                rel="noreferrer"
              >
                <button>Doomworld Thread</button>
              </a>
            </div>

            <p className="more-desc">DOOM2.WAD required</p>
          </div>
        </article>

        <article id="starlit-abyss">
          <h2>
            <img src={gargoyleA} alt="Lion Gargoyle" />
            <div>
              Starlit Abyss
              <br />
              <span>Ultimate DOOM Episode</span>
            </div>
          </h2>
          <div className="feature">
            <div>
              <p>
                Ready to dance with demons on the edge of the Starlit Abyss?
                This 9-map Ultimate DOOM episode is set to blast onto the scene,
                seething with infernal fiends, scorching hellfire, and enough
                firepower to make a Cyberdemon blush. While the full release
                will be yours to wreak havoc with for free, the brave souls who
                can't resist an early foray into the abyss can subscribe to the{" "}
                <img src="./img/orb_small.gif" alt="Under Construction" />{" "}
                <a href="#maincontent" className="under-construction">
                  BanjoDave Patreon
                </a>
                , granting you exclusive access to individual maps as they roll
                hot off the anvil. I will also be posting regular development
                updates to my{" "}
                <a
                  href="https://www.twitter.com/banjeetz"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
                . The abyss beckons... are you ready to answer its call?
              </p>
              <p className="p-desc">DOOM.WAD required</p>
              <div className="dev-progress">
                <ul>
                  <li>
                    <b>
                      <img src="./img/orb_small.gif" alt="Under Construction" />{" "}
                      Development
                    </b>
                  </li>
                  <li>E1M1: Deep Space Telemetry [IN PROGRESS]</li>
                  <li>
                    E1M2: Eldritch Nexus of the Eternal Furnace [COMING SOON]
                  </li>
                  <li>E1M3: [TBA]</li>
                </ul>
              </div>
            </div>
            <ScreenshotsCarousel screenshots={screensSA} />
          </div>
          <div className="button">
            <button className="under-construction">
              <img src="./img/orb_small.gif" alt="Under Construction" /> Early
              Access on Patreon!
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Doom;
