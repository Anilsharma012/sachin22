import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import contentRoutes from './routes/content';
import messageRoutes from './routes/messages';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

connectDB().catch(() => {
  console.error('Failed to connect to database');
  process.exit(1);
});

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/content', contentRoutes);
app.use('/api/admin/messages', messageRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', messageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
