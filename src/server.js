import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Routes
import IndexRoutes from './routes/index.routes';
import TasksRoutes from './routes/tasks.routes';

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());

// Routes
app.use(IndexRoutes);
app.use('/tasks', TasksRoutes);



export default app;
