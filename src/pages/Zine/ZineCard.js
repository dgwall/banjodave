import React from "react";

const ZineCard = ({ issue }) => (
  <>
    <h2>
      Issue #{issue.id} {issue.title}
    </h2>
    <a
      href={
        "https://s3.eu-north-1.amazonaws.com/banjodave.com/BanjoZine/BanjoZine-Issue-" +
        String(issue.id).padStart(3, "0") +
        ".pdf"
      }
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={
          "img/zine-covers/issue-" + String(issue.id).padStart(3, "0") + ".jpg"
        }
        alt={issue.title}
      />
      <br />
      Read now
    </a>
    <p className="contents">
      <b>Contents:</b> {issue.description}
    </p>
  </>
);

export default ZineCard;
