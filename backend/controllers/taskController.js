import Task from "../models/taskModel.js";

const addTask =  async (req , res) => {
const {title, description, project} = req.body;
const task = await Task.create ({ title, description, project });
res.status(201).json(task);
};

const updateTask = async (req , res) => {
const task = await Task.findByIdAndUpdate (req.params.id , req.body, {new : true});
res.json(task);
};

const deleteTask = async (req , res) => {
const task = await Task.findById (req.params.id);
if(!task) return res.status(404).json({ message : " Task not found"});
await task.deleteOne();
res.json({ message: " Task deleted "});
};

const getTasksByProject = async (req , res) => {
const tasks = await Task.find ({ project : req.params.projectId });
res.json(tasks);
};

export  {addTask, updateTask, deleteTask, getTasksByProject};