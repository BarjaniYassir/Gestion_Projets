import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./components.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
         Gestion de Projets
      </div>

      {user && (
        <ul className="navbar-links">
          <li onClick={() => navigate("/dashboard")}>Accueil</li>
          <li onClick={handleLogout} className="logout">
            Déconnexion
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
