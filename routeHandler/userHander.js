const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);

// Get Request
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

module.exports = router;
