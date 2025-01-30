require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

// const corsOptions = {
//     origin: 'http://localhost:5173',  // Allow requests from the frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});