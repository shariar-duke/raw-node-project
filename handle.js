const handle = (req, res) => {
    console.log(req.app.locals.titile);
    res.send('This is home page');
};

module.exports = handle;
