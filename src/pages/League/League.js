import React from "react";
import "./League.css";
import { Helmet } from "react-helmet";

function League() {
  return (
    <>
      <Helmet>
        <title>Banjo League</title>
      </Helmet>
      <section>
        <img
          src="./img/league/coming-soon.png"
          alt="Banjo League Coming Soon"
          loading="lazy"
        />
        <img
          src="./img/league/league-badges.png"
          alt="Banjo League Badges and Trophies"
          loading="lazy"
        />
      </section>
    </>
  );
}

export default League;
