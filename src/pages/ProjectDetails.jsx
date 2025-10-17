import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, deleteProject } from "../api/projectApi";
import { getTasksByProject, deleteTask, updateTask } from "../api/taskApi";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proj = await getProjectById(id);
        const taskList = await getTasksByProject(id);
        setProject(proj);
        setTasks(taskList);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement du projet");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    await updateTask(taskId, updates);
    const updatedTasks = await getTasksByProject(id);
    setTasks(updatedTasks);
  };

  const handleDeleteProject = async () => {
    if (window.confirm("Supprimer ce projet ?")) {
      await deleteProject(id);
      navigate("/dashboard");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container">
      {project ? (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => navigate(`/add-task/${project._id}`)}>
               Ajouter une tâche
            </button>
            <button
              style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
              onClick={handleDeleteProject}
            >
               Supprimer projet
            </button>
          </div>

          <h3 style={{ marginTop: "30px" }}> Liste des tâches</h3>
          {tasks.length === 0 ? (
            <p>Aucune tâche pour le moment.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))
          )}
        </>
      ) : (
        <p>Projet introuvable ou erreur de chargement.</p>
      )}
    </div>
  );
}

export default ProjectDetails;
