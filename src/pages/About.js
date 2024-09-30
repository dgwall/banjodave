import React from "react";
import { Helmet } from "react-helmet";

function About() {
  var user = "&#100;&#97;&#118;&#105;&#100;";
  var domain =
    "&#100;&#103;&#119;&#105;&#110;&#116;&#101;&#114;&#97;&#99;&#116;&#105;&#118;&#101;";
  return (
    <>
      <Helmet>
        <title>About BanjoDave.co.uk</title>
      </Helmet>
      <section>
        <header>About</header>
        <div className="overview">
          <p>
            Hi, I'm David, a developer living in Scotland. I have a background
            in Applied Computing and experience in web development, game design,
            and technical support. My skill set includes Python, Java, C, C++,
            SQL, HTML, CSS, JavaScript, and React.
          </p>
          <p>
            My interest in web development started at age 12 when I received my
            first book about HTML. I created several websites, starting with one
            for sharing Nintendo rumours, then one to share my drawings, and
            later a Banjo-Kazooie website, among others.
          </p>
          <p>
            I've always daydreamed about making my perfect video game, and I'm
            currently working on various game projects to improve my development
            skills, with many plans for the future.
          </p>
          <p>
            Beyond that, I'm interested in esports, philosophy, art, guitar,
            bouldering, and skateboarding.
          </p>
          <p>
            Business inquiries to:{" "}
            <i
              href={`mailto:${user}@${domain}.co.uk`}
              dangerouslySetInnerHTML={{
                __html: `${user}@${domain}.co.uk`,
              }}
            />
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
