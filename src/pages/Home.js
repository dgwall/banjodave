import React from "react";
import { Link } from "react-router-dom";
import HoverAnimationPanel from "../components/shared/HoverAnimationPanel";
import { Helmet } from "react-helmet";

const panelA = { id: "0dg", name: "[0D]Games", imageCount: 4 };
const panelB = { id: "lvl", name: "Level Design", imageCount: 5 };
const panelC = { id: "soc", name: "Stay Updated", imageCount: 4 };

function Home() {
  return (
    <>
      <Helmet>
        <title>BanjoDave.co.uk</title>
      </Helmet>

<<<<<<< HEAD
=======
      <article className="home-overview">
        <p>
          Alright? Welcome to <span className="title">BanjoDave.co.uk</span>. I'm
          a front-end web and games developer based in Scotland, designing and
          implementing engaging interactive user experiences. Currently I am
          diligently transforming my little corner of our vast digital
          wasteland. The crafting process is still underway, stay tuned.
        </p>
      </article>

>>>>>>> b180a1032d2bf504d226c0321ec441ed8c96dec2
      <section className="homepage-content">
        <article className="benefits">
          <p>
            <Link to="/0dgames">[0D]Games</Link> is where my game development
            projects live.
          </p>
          <Link to="/0dgames/">
            <HoverAnimationPanel data={panelA} />
          </Link>
        </article>

        <article className="benefits">
          <p>I create maps for the classic games DOOM and N.</p>
          <Link to="/doom/">
            <HoverAnimationPanel data={panelB} />
          </Link>
        </article>

        <article className="benefits">
          <p>
            If you want to keep tabs on what's going down or sneak a peek at my
            day-to-day grind, join the{" "}
            <a
              href="https://discord.gg/Su7BCchJJh"
              target="_blank"
              rel="noreferrer"
            >
              BanjoCave Discord
            </a>
            , or follow me on{" "}
            <a
              href="https://x.com/banjeetz"
              target="_blank"
              rel="noreferrer"
            >
              X @banjeetz
            </a>
            , and{" "}
            <a
              href="https://www.youtube.co.uk/channel/UCWIX3fTPDoVGPHxReT6vC5g"
              target="_blank"
              rel="noreferrer"
            >
              YouTube @BanjoD453
            </a>
            .
          </p>
          <Link to="/thank-you/">
            <HoverAnimationPanel data={panelC} />
          </Link>
        </article>
      </section>
    </>
  );
}

export default Home;
