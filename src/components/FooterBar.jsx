import React from "react";
import "./components.css";

function FooterBar() {
  return (
    <footer className="footer">
       {new Date().getFullYear()} - Gestion de projets & tâches.
    </footer>
  );
}

export default FooterBar;
