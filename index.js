const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHander');
const loginHandler = require('./routeHandler/loginHandler');

// Express app initialization
const app = express();
app.use(express.json());

// Database connection with Mongoose
mongoose
    .connect('mongodb://localhost/todos')
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Database connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

// Todo Route
app.use('/todo', todoHandler);

// User Route
app.use('/user', userHandler);

// Loging Route
app.use('/login', loginHandler);

// Default error handler middleware
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err); // Ensure error is forwarded correctly
    }

    res.status(500).json({ error: err.message || 'Internal Server Error' });
}

// Register the error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
