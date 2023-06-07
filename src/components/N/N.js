import React from "react";
import { Link } from "react-router-dom";
import "./N.css";

function N() {
  return (
    <section className="under-construction">
      <header>N Mapping</header>
      <div>
        Under Construction. TO-DO: 4 Page. rootootoot, sol, N++, Complete Works.
      </div>
      <div>
        <Link to="/n/rootootoot">rootootoot</Link>
      </div>
      <div>
        <Link to="/n/sol">Sol</Link>
      </div>
      <div>
        <Link to="/n/plusplus">N++</Link>
      </div>
      <div>
        <Link to="/n/dw40">Complete Works of DW40</Link>
      </div>
    </section>
  );
}

export default N;
