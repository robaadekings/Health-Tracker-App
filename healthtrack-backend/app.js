const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/logRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000'],  // Update this in production
    credentials: true
}));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);

app.use(errorMiddleware);

module.exports = app;
