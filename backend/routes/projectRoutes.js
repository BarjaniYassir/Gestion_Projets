import express from "express";
import { getProjects, createProject, deleteProject, getProjectById} from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, getProjects)
    .post(protect, createProject);
    
router.route("/:id")
    .get(protect, getProjectById)
    .delete(protect, deleteProject);

export default router;