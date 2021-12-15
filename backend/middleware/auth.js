const jwt = require('jsonwebtoken'); // On a besoin du package jwt //

require('dotenv').config();

module.exports = (req, res, next) => { // On exporte un middleware //
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header dans un tableau split et on retourne le 2ème élément //
        console.log("token---token header auth-->" , token , process.env.JWT_RANDOM_TOKEN)
        const decodedToken = jwt.verify(token, process.env.JWT_RANDOM_TOKEN);// On décode le token, la clé doit correspondre à celle de la fontion login
        console.log("req.token--->" , req.token)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId!== userId) { // Si l'userId du corps de la requête est différent de userId //
            throw 'User ID non valable'; // Throw pour renvoyer l'erreur //
        } else {
            next();// Tout est ok donc, on passe au prochain middleware //
        }
        
} catch {
    res.status(401).json ({ message: "Token d'authentification invalide"});
}
}

