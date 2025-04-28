import express from 'express';
import appealRoutes from './routes/appealRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/appeals', appealRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;