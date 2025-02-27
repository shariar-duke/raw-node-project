const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // Ensures unique usernames
    },
    password: {
        type: String,
        required: true,
    },
}); // Adds createdAt and updatedAt fields

module.exports = loginSchema;
