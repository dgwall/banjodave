import React from "react";
import skull from "../../assets/images/zine/skull.png";

const CurrentIssue = ({ currentIssue }) => {
  if (!currentIssue) return null;
  return (
    <article className="current-issue">
      <h1 className="skull-head">
        <img src={skull} alt="Skull" className="skull" />
      </h1>
      <p>
        A new moon rises, heralding the unveiling of issue #{currentIssue.id}.
      </p>
      <div className="issue-details current">
        <div className="current-container">
          <div>
            <a
              href={
                "img/BanjoZine-Issue-" +
                String(currentIssue.id).padStart(3, "0") +
                ".pdf"
              }
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={
                  "img/zine-covers/issue-" +
                  String(currentIssue.id).padStart(3, "0") +
                  ".jpg"
                }
                alt={currentIssue.title}
              />
              <br />
              Read now
            </a>
          </div>
          <p className="contents">
            <b>Contents</b>
            <br />
            {currentIssue.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CurrentIssue;
