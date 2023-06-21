import React from "react";
import skull from "../../assets/images/zine/skull.png";
import ZineCard from "./ZineCard";

const Archive = ({ archiveIssues, selectedIssue, handleIssueClick }) => {
  return (
    <article>
      <h1>
        <img src={skull} alt="Skull" className="skull" loading="lazy" />
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
              #{issue.id} {issue.title}
            </li>
          ))}
        </ul>
        <div
          className={`issue-details archive ${
            selectedIssue ? "selected" : "blank"
          }`}
        >
          {selectedIssue ? (
            <div className="archive-container">
              <ZineCard issue={selectedIssue} />
            </div>
          ) : (
            <p className="select-an-issue">&lt; Select an issue</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default Archive;
