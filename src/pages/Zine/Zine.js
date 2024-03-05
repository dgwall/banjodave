import React, { useState, useEffect } from "react";
import logo from "../../assets/images/zine/banjozine.png";
import skull from "../../assets/images/zine/skull.png";
import seal from "../../assets/images/zine/banjohouse.png";
import "./Zine.css";
import CurrentIssue from "./CurrentIssue";
import Archive from "./Archive";
import { Helmet } from "react-helmet";

function Zine() {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("./BLACKMAGIC.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Zine fetch error: Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIssues(data.sort((a, b) => b.id - a.id));
        } else {
          throw new Error("Zine fetch error: Invalid data format");
        }
      })
      .catch(() => setError(true));
  }, []);

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const currentIssue = issues[0] || null;
  const archiveIssues = issues.slice(0);

  return (
    <>
      <Helmet>
        <title>BanjoZine</title>
      </Helmet>
      <section>
        <header>
          <img
            src={logo}
            alt="BanjoZine"
            className="header-logo"
            loading="lazy"
          />
        </header>

        <article className="overview">
          <p>As nightfall descends, embark on an unexpected odyssey.</p>
          <p>
            <b>BanjoZine</b>: the underground intersection of games, mysticism,
            and media. Established in March 2021, this digital cryptex delves
            into pop culture revelations, the arcane secrets of game design, and
            the abyss of philosophical discourse.
          </p>
        </article>

        {error ? (
          <article className="error">
            <h1>
              <img src={skull} alt="Skull" className="skull" loading="lazy" />
              Unseen Forces Have Disrupted Our Connection
            </h1>
            <p>
              It seems a temporal rift has swallowed our latest issues into the
              abyss. Rest assured, our metaphysical engineers are working hard
              to rectify this reality distortion. Please check back after the
              moon's next phase.
            </p>
          </article>
        ) : (
          <>
            <CurrentIssue currentIssue={currentIssue} />
            <Archive
              archiveIssues={archiveIssues}
              selectedIssue={selectedIssue}
              handleIssueClick={handleIssueClick}
            />
          </>
        )}

        {/*
        <article>
          <h1>
            <img src={skull} alt="Skull" className="skull" loading="lazy" />
            Patreon
          </h1>
          <p>
            Do you yearn for a deeper connection with the unseen forces of
            BanjoZine? The ancient pact of Patreon awaits! Gazing into the dark
            crystal pool of previews, patrons scry pages of upcoming issues,
            while those of higher ranks can manifest physical copies into
            existence. Through support and shared energies, patrons become
            essential conduits of creation, fanning our ever-burning black
            flame, and propelling our nocturnal journey further into the
            unknown.
          </p>
          
        <a href="#maincontent" className="patreon-link">
        target="_blank"
        rel="noreferrer"
          <span className="under-construction">
            <img
              src="../img/orb_invert_small.gif"
              alt="Under Construction"
              loading="lazy"
            />{" "}
            Join our arcane quest on Patreon
          </span>
        </a>
        </article>
        */}

        <article>
          <div align="left">
            <img src={seal} alt="Seal of Banjo House Publishing" />
          </div>
        </article>
      </section>
    </>
  );
}

export default Zine;
