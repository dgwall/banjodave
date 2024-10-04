import React from "react";
import { Helmet } from "react-helmet";

function Support() {
  return (
    <>
      <Helmet>
        <title>Support BanjoDave.co.uk</title>
      </Helmet>
      <section>
        <header className="under-construction">Support BanjoDave.co.uk</header>
        <div className="overview">
          <p>
          The <a
              href="https://discord.gg/Su7BCchJJh"
              target="_blank"
              rel="noreferrer"
            >BanjoCave Discord</a> is where you can see my projects take shape, discuss gaming and game development, and forage for grubs with weary goblins in the chaos hole.
            Updates also at:{" "}
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
          <h2>Thanks!</h2>
        </div>
      </section>
    </>
  );
}

export default Support;
