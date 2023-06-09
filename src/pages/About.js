import React from "react";

function About() {
  var user = "&#119;&#97;&#107;&#107;&#97;&#99;&#101;";
  var domain = "&#103;&#109;&#97;&#105;&#108;";
  return (
    <section>
      <header>About</header>
      <div className="overview">
        <p>
          Hi, I'm David, a developer living in Scotland. I have a background in
          Applied Computing and experience in web development, game design, and
          technical support. My skill set includes Python, Java, C, C++, SQL,
          HTML, CSS, JavaScript, and React.
        </p>
        <p>
          My interest in web development started at age 12 when I received my
          first book about HTML. I created several websites, starting with one
          for sharing Nintendo rumours, then one to share my drawings, and later
          a Banjo-Kazooie website, among others.
        </p>
        <p>
          I've always daydreamed about making my perfect video game, and I'm
          currently working on various game projects to improve my development
          skills, with many plans for the future.
        </p>
        <p>
          Beyond that, I'm interested in philosophy, art, guitar, bouldering,
          and skateboarding. In my spare time, I create indie games and other
          forms of content.
        </p>
        <p>
          Business inquiries to:{" "}
          <i
            href={`mailto:${user}@${domain}.com`}
            dangerouslySetInnerHTML={{
              __html: `${user}@${domain}.com`,
            }}
          />
        </p>
      </div>
    </section>
  );
}

export default About;
