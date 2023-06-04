import React from "react";
import skull from "../../assets/images/zine/skull.png";
import ZineCard from "./ZineCard";

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
          <ZineCard issue={currentIssue} />
        </div>
      </div>
    </article>
  );
};

export default CurrentIssue;
