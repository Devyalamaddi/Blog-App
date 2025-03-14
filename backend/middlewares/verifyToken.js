const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization; // Fixed to lowercase 'authorization'
    // console.log("Authorization header: ", bearerToken); // Debug

    if (!bearerToken) {
        return res.status(401).send({ message: "Unauthorized access. Please log in to continue." });
    }

    const token = bearerToken.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.SK_user);
        // console.log("Verified user:", verified); // Debug
        req.user = verified; // Attach decoded info for further use
        next();
    } catch (err) {
        console.error("Token verification failed:", err); // Debug
        res.status(403).send({ message: "Invalid token. Access denied." });
    }
}

module.exports = verifyToken;
