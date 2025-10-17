import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask } from "../api/taskApi";

function AddTask() {
  const { projectId } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ ...form, project: projectId });
      alert(" Tâche ajoutée avec succès !");
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la tâche.");
    }
  };

  return (
    <div className="container">
      <h2>Ajouter une tâche</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminée</option>
        </select>

        <button type="submit">Créer la tâche</button>
      </form>
    </div>
  );
}

export default AddTask;
