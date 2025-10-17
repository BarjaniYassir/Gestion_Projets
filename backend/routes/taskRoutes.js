import express from "express";
import { addTask, updateTask, deleteTask, getTasksByProject} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/project/:projectId", protect, getTasksByProject);  
router.post("/", protect, addTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask)

export default router;