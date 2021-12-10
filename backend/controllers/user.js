//***npm install --save bcrypt */
const bcrypt = require('bcrypt');
//**npm install --save jsonwebtoken */
const jwt = require('jsonwebtoken');


const db = require('../data/databaseConnect.js');
const mysql = require("mysql");
const User = require('../models/user');
const user = require('../models/user');
const maxAge = 3 * 24 * 60 *60 * 1000;
const createToken = (iduser) => {
  return jwt.sign({iduser}, process.env.JWT_RANDOM_TOKEN, 
    { expiresIn: '24h' }

  )
}


// Error Class

require('dotenv').config();




exports.signup = async (req, res) => {
  try {  
     const nom = req.body.nom;
     const prenom = req.body.prenom;
     const email = req.body.email;
     const password = req.body.password;
     const iduser = req.body.iduser;
    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const pass= {
      password: passHash,
    };
   
    console.log(pass)
    db.query("INSERT INTO user (nom, prenom, email, password ) VALUES (?,?,?,?)",[nom, prenom, email, pass], (err,result)=> {
      console.log("result------>", result)
      
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({
           message: "Compte Créé !",
           token: jwt.sign(
            { userId: iduser },
            `${process.env.JWT_RANDOM_TOKEN}`,
            { expiresIn: '24h' }
          )  
          });
          
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Failed registration", err });
  }
};
//******On recupère un user de la base de données, si user introuvable return (401) */
//*****On compare le mot de passe entré avec le hash (bcrypt.compare), si la comparaison n'est pas bonne (401)*/
//*****Sinon si la comparaison est bonne, utilisateur a rentré des bonnes informations et on renvoie un userID et token  */



exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM user WHERE email=?`
  db.query(sql, [email], (err, results) => {
    console.log("results", results[0].password)
   
    if (!results) {
      return res.status(401).json({error: 'Utilisateur non trouvé !'})
    }
    console.log ("password ----->",password ,"results---->", results[0].password)
    bcrypt.compare(password, results[0].password) 
    
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !'});
      } else {
        console.log("Connexion réussi !!");
        res.status(200).json({ 
           userId: user._id ,
          token: jwt.sign(
            { userId: iduser },
            `${process.env.JWT_RANDOM_TOKEN}`,
            { expiresIn: '24h'}
          )
        })
      }
    })
  })
  
  }
   
 
  

   
   