import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js'

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin:'http://localhost:5173',
  methods:'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials:true,
}
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',taskRoutes);
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});



// Define a test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
