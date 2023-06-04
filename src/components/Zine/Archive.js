// components/Archive.js
import React from "react";
import skull from "../../assets/images/zine/skull.png";

const Archive = ({ archiveIssues, selectedIssue, handleIssueClick }) => {
  return (
    <article>
      <h1>
        <img src={skull} alt="Skull" className="skull" />
        Archive
      </h1>
      <p>
        Missed an issue? No problem. For those brave enough to enter, the
        archive stands as a sanctum dedicated to the eternal preservation of the
        spectral echoes of forgotten tomes. All previous issues stand ready for
        your perusal, offered freely.
      </p>
      <div className="archive">
        <ul className="issue-list">
          {archiveIssues.map((issue) => (
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
  );
};

export default Archive;
