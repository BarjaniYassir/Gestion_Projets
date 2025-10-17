import express from 'express';
import mongoose from 'mongoose';
import cors  from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log(' MongoDB connecté'))
    .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`serveur démarré sur le port ${PORT}`));