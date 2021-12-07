//***npm install --save bcrypt */
const bcrypt = require('bcrypt');
//**npm install --save jsonwebtoken */
const jwt = require('jsonwebtoken');
const User = `SELECT * FROM user`;
const db = require('../config/db');

require('dotenv').config();


//***function signup qui va crypté le password (brcrypt.hash) */
//***cette function va crypter le  password et  créer un nouveau utilisateur (user)*/
/**en prenant le password crypté + email  et l'enregistré ---> save()*/
exports.signup = (req, res) => {
    (req,res, next)=> {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const password = req.body.password;
        bcrypt.hash(req.body.password, 10)
        
        db.query("INSERT INTO user (nom, prenom, email, password ) VALUES (?,?,?,?)",[nom, prenom, email, password], (err,result)=>{   
        console.log(err)
        console.log(res)
        })
      }
    }
      
    



//******On recupère un user de la base de données, si user introuvable return (401) */
//*****On compare le mot de passe entré avec le hash (bcrypt.compare), si la comparaison n'est pas bonne (401)*/
//*****Sinon si la comparaison est bonne, utilisateur a rentré des bonnes informations et on renvoie un userID et token  */
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ? AND password = ?",[email, password], (err,result)=>{   
    if(err) {
        res.send({err:err})
    }



         if (result){
           res.send(result);
         
         }else {
           res.send({ message: "Mauvais email/password "});
         }
       
       }
      
  
   
  )};

