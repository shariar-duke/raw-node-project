const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

const router = express.Router();
const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);

// POST Request for Login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If login is successful, create a JWT token
        const token = jwt.sign(
            { username: user.username, userId: user._id },
            process.env.JWT_SECRET, // Access the JWT_SECRET from environment variables
            { expiresIn: '1h' } // Optionally set an expiration for the token
        );

        // Send the token as a response
        res.status(200).json({
            message: 'Login successful',
            token, // Include the token in the response
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Export the router
module.exports = router;
