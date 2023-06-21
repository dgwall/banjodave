import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="homepage">
      <article className="overview">
        <p>
          Alright? Welcome to <span className="title">BanjoDave.com</span>. I'm
          a front-end web and games developer based in Scotland, designing and
          implementing engaging interactive user experiences. Currently I am
          diligently transforming my little corner of our vast digital wasteland
          into a thriving gallery of projects. The crafting process is still
          underway, but I'm looking forward to unveiling my digital gems to you
          in due time. Stay tuned.
        </p>
      </article>

      <article>
        <h2>0DGames</h2>
        <p>
          <Link to="/0dgames">0DGames</Link> is where my game development
          projects come to life. Keep an eye on this space as the curtain
          prepares to rise on the world of 0DGames.
        </p>
      </article>

      <article>
        <h2>Level Design</h2>
        <p>
          I create maps for the classic games DOOM by id Software and N by
          Metanet Software. My aim is to contribute meaningfully to these
          classic games.
        </p>
      </article>

      <article>
        <h2>Stay Updated</h2>
        <p>
          If you want to keep tabs on what's going down or sneak a peek at my
          day-to-day grind, join the{" "}
          <a
            href="https://discord.com/invite/W9UtSAYQXR"
            target="_blank"
            rel="noreferrer"
          >
            BanjoCave on Discord
          </a>
          , or follow me on{" "}
          <a
            href="https://www.instagram.com/banjeetz/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          ,{" "}
          <a
            href="https://twitter.com/banjeetz"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          , and{" "}
          <a
            href="https://www.youtube.com/channel/UCWIX3fTPDoVGPHxReT6vC5g"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>{" "}
          where I share whatever's cooking in the game dev kitchen and the ins
          and outs of my creations.
        </p>
      </article>
    </section>
  );
}

export default Home;
