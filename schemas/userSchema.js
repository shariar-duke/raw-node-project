const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensures unique usernames
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active', // Default status
        },
    },
    { timestamps: true },
); // Adds createdAt and updatedAt fields

module.exports = userSchema;
