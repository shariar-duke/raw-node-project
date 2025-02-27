const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const loginSchema = require('../schemas/loginSchema');

const Login = mongoose.model('Login', loginSchema);

// Get Request
router.get('/', (req, res) => {});

module.exports = router;
