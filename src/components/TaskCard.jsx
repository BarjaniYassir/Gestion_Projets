import React from "react";
import "./components.css";

function TaskCard({ task, onDelete, onUpdate }) {
  return (
    <div className={`task-card ${task.status === "done" ? "completed" : ""}`}>
      <div className="task-info">
        <h4 className="task-title">{task.title}</h4>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
        >
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminée</option>
        </select>

        <button onClick={() => onDelete(task._id)}> Supprimer</button>
      </div>
    </div>
  );
}

export default TaskCard;
