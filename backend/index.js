// index.js
import express from 'express';
import connectDB from './d/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

