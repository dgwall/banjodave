import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <header>
        <h1>BanjoDave.com</h1>
      </header>

      <article className="overview">
        <p>
          Alright? Welcome to BanjoDave.com. As a web and game developer, I'm
          shaping and refining each pixel of my creations, diligently
          transforming my corner of our vast digital wasteland into a thriving
          gallery of projects. The crafting process is still underway, but I'm
          looking forward to unveiling my digital gems to you in due time. Stay
          tuned.
        </p>
      </article>

      <article>
        <h2>0DGames</h2>
        <p>
          <Link to="/0dgames">0DGames</Link> is the creative playground where my
          game development projects come to life. As a solo dev, I aspire to
          design indie action games defined by distinctive artwork, crisp
          controls, and gripping mechanics. Behind the scenes, I'm fervently
          curating a showcase of my projects and insights into my design
          process. Keep an eye on this space as the curtain prepares to rise on
          the world of 0DGames.
        </p>
      </article>

      <article>
        <h2>Level Design</h2>
        <p>
          I create maps for the classic games DOOM by id Software and N by
          Metanet Software. <Link to="/doom">In DOOM</Link>, I mold the eerie
          corridors and chambers of demon-infested bases, striving to challenge
          and engage players with every unexpected turn.{" "}
          <Link to="/n">For N</Link>, I focus on constructing 2D landscapes that
          test players' agility and dynamic problem-solving skills, keeping in
          line with the game's unique blend of momentum-based gameplay and
          precise controls. My aim is to contribute meaningfully to these
          classic games, providing levels that both challenge and entertain.
        </p>
      </article>

      <article>
        <h2>Stay Updated</h2>
        <p>
          Ever thought about diving into the gritty details of game creation or
          getting a sneak peek of my games, levels, and{" "}
          <Link to="/zine">BanjoZine</Link> issues before they hit the public?
          That's exactly what I'm offering to my Patreon community (Launching
          Soon). If this seems like your kind of deal, It would be sick if you
          could{" "}
          <a
            href="https://www.patreon.com/banjodave"
            target="_blank"
            rel="noreferrer"
          >
            join us on Patreon
          </a>
          .
        </p>
        <p>
          If you just want to keep tabs on what's going down or sneak a peek at
          my day-to-day grind, join the{" "}
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
          and outs of my creations. So, if you're game, let's... game?
        </p>
      </article>
    </section>
  );
}

export default Home;
