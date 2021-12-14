const jwt = require('jsonwebtoken'); // On a besoin du package jwt //

require('dotenv').config();

module.exports = (req, res, next) => { // On exporte un middleware //
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token---token header auth-->" , token)
        req.token = jwt.verify(token, process.env.JWT_RANDOM_TOKEN);
        console.log("req.token--->" , req.token)
        next();
        console.log("next()--->", next)
       
} catch {
    res.status(401).json ({ message: "Token d'authentification invalide"});
}
}

