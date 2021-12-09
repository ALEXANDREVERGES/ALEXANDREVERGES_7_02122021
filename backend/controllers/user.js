//***npm install --save bcrypt */
const bcrypt = require('bcrypt');
//**npm install --save jsonwebtoken */
const jwt = require('jsonwebtoken');
const User = 'SELECT * FROM user';

const db = require('../config/db');
const mysql = require("mysql");

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



exports.login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ? ",[email], (err,user)=>{   
    if(!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    } 
    bcrypt.compare(password, user[0].password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        message: "Connecté !",
           token: jwt.sign(
            { userId: iduser },
            `${process.env.JWT_RANDOM_TOKEN}`,
            { expiresIn: '24h' }
          )  
      });
    }
    )
  })
   
  };