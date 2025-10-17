import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, createProject, deleteProject } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(form);
    setForm({ name: "", description: "" });
    const data = await getProjects();
    setProjects(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce projet ?")) {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom du projet"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Créer un projet</button>
      </form>

      <h3>Mes projets</h3>
      {projects.length === 0 ? (
        <p>Aucun projet pour l’instant.</p>
      ) : (
        projects.map((p) => (
          <div key={p._id}>
            <ProjectCard project={p} />
            <button onClick={() => navigate(`/projects/${p._id}`)}>
              Voir Détails
            </button>
            <button onClick={() => handleDelete(p._id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
