import Project from "../models/projectModel.js";

const createProject = async (req , res) =>{
    const { name, description } = req.body;
    const project = await Project.create( {name, description, owner: req.user.id} );
    res.status(201).json(project);
};

const deleteProject = async (req , res) =>{
    const project = await Project.findById( req.params.id );
    if (!project) return res.status(404).json({ message: "Project not found"});
    await project.deleteOne();
    res.json({ message: " Project deleted "});
};

const getProjects = async (req , res) =>{
    const projects = await Project.find( {owner: req.user.id} );
    res.json(projects);
};

const getProjectById = async (req , res) =>{
    const project = await Project.findById( req.params.id);
    res.json(project);
};

export  {getProjects, createProject, deleteProject, getProjectById};
