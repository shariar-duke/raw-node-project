const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = todoSchema;
