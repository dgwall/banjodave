import React, { useState } from "react";
import logo from "../../assets/images/zine/banjozine.png";
import skull from "../../assets/images/zine/skull.png";
import seal from "../../assets/images/zine/banjohouse.png";
import "./Zine.css";

function Zine() {
  const issues = [
    {
      id: 1,
      title: "Issue #1 March 2021",
      description:
        "rootootoot, Mapwich 2, Vanish Glide, Things, Orb, ULTRACLUB4K, Podcasts, ガキの使い, Nintendo 64, 森林浴, Productivity.",
    },
    {
      id: 2,
      title: "Issue #2 June 2021",
      description:
        "MALAGARD, Blazing Beachhead, Lullaby by Danlex, Cosmic Snake, Fissure, Advanced Tech, '90s Games, GameCube, Gruntz, Star____?, The Mushroom King, Πυῤῥώνειοι ὑποτυπώσεις & मूलमध्यमककारिका, ドラゴンボールＺ 愛する者のために... ベジータ散る!!, དུག་གསུམ་.",
    },
  ].sort((a, b) => b.id - a.id);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  return (
    <section>
      <header>
        <img src={logo} alt="BanjoZine" className="header-logo" />
      </header>

      <article className="overview">
        <p>
          BanjoZine: the underground intersection of games, philosophy, and
          media. Established in March 2021, this digital cryptex delves into pop
          culture revelations, the arcane secrets of game design, and the abyss
          of philosophical discourse. As nightfall descends, embark on an
          unexpected odyssey.
        </p>
      </article>

      <article className="current-issue">
        <h1 className="skull-head">
          <img src={skull} alt="Skull" className="skull" />
        </h1>
        <p>
          A new moon rises, heralding the unveiling of issue #{issues[0].id}.
        </p>
        <div className="issue-details current">
          <div className="current-container">
            <div>
              <a
                href={
                  "img/BanjoZine-Issue-" +
                  String(issues[0].id).padStart(3, "0") +
                  ".pdf"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={
                    "img/zine-covers/issue-" +
                    String(issues[0].id).padStart(3, "0") +
                    ".jpg"
                  }
                  alt={issues[0].title}
                />
                <br />
                Read now
              </a>
            </div>
            <p className="contents">
              <b>Contents</b>
              <br />
              {issues[0].description}
            </p>
          </div>
        </div>
      </article>

      <article>
        <h1>
          <img src={skull} alt="Skull" className="skull" />
          Archive
        </h1>
        <p>
          Missed an issue? No problem. For those brave enough to enter, the
          archive stands as a sanctum dedicated to the eternal preservation of
          the spectral echoes of forgotten tomes. All previous issues stand
          ready for your perusal, offered freely.
        </p>

        <div className="archive">
          <ul className="issue-list">
            {issues
              .filter((issue, index) => index !== 0)
              .map((issue) => (
                <li key={issue.id} onClick={() => handleIssueClick(issue)}>
                  {issue.title}
                </li>
              ))}
          </ul>

          <div
            className={`issue-details archive ${
              selectedIssue ? "selected" : "blank"
            }`}
          >
            {selectedIssue && (
              <div className="archive-container">
                <h2>{selectedIssue.title}</h2>
                <a
                  href={
                    "img/BanjoZine-Issue-" +
                    String(selectedIssue.id).padStart(3, "0") +
                    ".pdf"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={
                      "img/zine-covers/issue-" +
                      String(selectedIssue.id).padStart(3, "0") +
                      ".jpg"
                    }
                    alt={selectedIssue.title}
                  />
                  <br />
                  Read now
                </a>
                <p className="contents">
                  <b>Contents:</b> {selectedIssue.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </article>
      <article>
        <h1>
          <img src={skull} alt="Skull" className="skull" />
          Patreon
        </h1>
        <p>
          Do you yearn for a deeper connection with the unseen forces of
          BanjoZine? The ancient pact of Patreon awaits the valorous! Gazing
          into the dark crystal pool of previews, patrons scry pages of upcoming
          issues, while those of higher ranks can manifest physical copies into
          existence. Through support and shared energies, patrons become
          essential conduits of creation, fanning our ever-burning black flame,
          and propelling our nocturnal journey further into the unknown. Will
          you join our arcane quest?
        </p>
        <a
          href="https://www.patreon.com/user?u=11485117"
          target="_blank"
          rel="noreferrer"
          className="patreon-link"
        >
          Join us on Patreon
        </a>
        <div align="center">
          <img src={seal} alt="Seal of Banjo House Publishing" />
        </div>
      </article>
    </section>
  );
}

export default Zine;
