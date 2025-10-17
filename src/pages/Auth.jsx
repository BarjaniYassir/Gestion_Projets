import React, { useState, useContext } from "react";
import userApi from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await userApi.loginUser(form);
        login(data);
        navigate("/dashboard");
      } else {
        await userApi.registerUser(form);
        alert("Inscription réussie ! Connecte-toi maintenant.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Erreur d'authentification");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="Nom complet"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      <p>
        {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={{ color: "#00bcd4", cursor: "pointer" }}
        >
          {isLogin ? "Inscris-toi" : "Connecte-toi"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
