const express = require('express');

const adminRouter = express.Router();
// express.Router call korar por jeta holo seta holo o amk ekta router instance dilo

adminRouter.get('/', (req, res) => {
    res.send('This is from admin Router');
});

adminRouter.get('/login', (req, res) => {
    res.send('Login');
});

module.exports = adminRouter;
