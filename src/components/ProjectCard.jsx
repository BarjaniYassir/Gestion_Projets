import React from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="project-card" onClick={() => navigate(`/projects/${project._id}`)}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;
