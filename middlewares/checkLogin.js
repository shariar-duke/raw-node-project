const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;

    // Check if the authorization header is missing or malformed
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing or malformed' });
    }

    try {
        // Extract token
        const token = authorization.split(' ')[1];

        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user information to the request object
        const { username, userId } = decoded;
        req.username = username;
        req.userId = userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Authentication token has expired' });
        }
        // Handle other errors (e.g., invalid token)
        return res
            .status(401)
            .json({ message: 'Authentication failure: Invalid or malformed token' });
    }
};

module.exports = checkLogin;
