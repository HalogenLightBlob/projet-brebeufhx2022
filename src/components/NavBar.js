import React, { useState } from "react";
import "./nav.css";
import logo from "../../src/demo-icon.jpeg";
import { NavLink } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";

const NavBar = () => {
  // Show link drawer or not
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav class="nav-bar">
      <div style={{ width: "50%" }}>
        <NavLink className="logo" to="/">
          {/* <img src={logo} alt="logo" width="40px" height="40px" /> */}
          <p className="brand-name">Protection des droits de la jeunesse</p>
        </NavLink>
      </div>
      <ul
        class="nav-links"
        style={{ alignItems: "center" }}
        id={showLinks ? "hidden" : ""}
      >
        <NavLink className="nav-link" to="/">
          Accueil
        </NavLink>
        <NavLink className="nav-link" to="/explore">
          Explorer
        </NavLink>
        <NavLink className="nav-link nav-btn" to="/petition">
          Faire une Pétition
        </NavLink>
      </ul>
      <button
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
        onClick={() => {
          setShowLinks(!showLinks);
        }}
      >
        <ReorderIcon />
      </button>
    </nav>
  );
};

export default NavBar;
