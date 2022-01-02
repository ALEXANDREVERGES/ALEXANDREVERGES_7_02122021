//***npm install --save bcrypt */
const bcrypt = require('bcrypt');
//**npm install --save jsonwebtoken */
const jwt = require('jsonwebtoken');


const db = require('../data/databaseConnect.js');




// Error Class

require('dotenv').config();



exports.signup = async (req, res) => {
  try {  
     const nom = req.body.nom;
     const prenom = req.body.prenom;
     const email = req.body.email;
     const password = req.body.password;
    // const iduser = req.body.iduser;
    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const pass= {
      password: passHash,
    };
   console.log(req.body)
    console.log(pass)
    db.query("INSERT INTO user (nom, prenom, email, password ) VALUES (?,?,?,?)",[nom, prenom, email, pass["password"]], (err,result)=> {
      console.log("results------>", result)
      console.log ("password",pass["password"])
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({
           message: "Compte Créé !",
         //  token: jwt.sign(
         //   { userId: iduser },
          //  `${process.env.JWT_RANDOM_TOKEN}`,
           // { expiresIn: '24h' }
          //)  
          });
          
      }
    });
  } catch (err) {
    res.status(409).json({ message: "Failed registration", err });
  }
};
//******On recupère un user de la base de données, si user introuvable return (401) */
//*****On compare le mot de passe entré avec le hash (bcrypt.compare), si la comparaison n'est pas bonne (401)*/
//*****Sinon si la comparaison est bonne, utilisateur a rentré des bonnes informations et on renvoie un userID et token  */



exports.login = (req, res) => {
  //const nom = req.body.nom;
 // const prenom = req.body.prenom;
  const email = req.body.email;
  const password = req.body.password;
 // const iduser = req.params.iduser;
  const sql = `SELECT * FROM user WHERE email=?`
  db.query(sql, [email], (err, results) => {
    
   
    if (err) {
      return res.status(401).json({error: 'Utilisateur non trouvé !'})
    }
    console.log(results)
    
   // console.log("req.params--->" , req.params)
   // console.log ("password ----->",password ,"results.password---->", results[0].password)
   // console.log ("results.iduser---->", results[0].iduser)
   // console.log("req.body---->",req.body)
    bcrypt.compare(password, results[0].password) 
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !'});
      }  
        console.log("Connexion réussi !!");
       return  res.status(200).json({ 
          iduser: results[0].iduser,
          results:({results}),
          token: jwt.sign(
            { userId: results[0].iduser },
            process.env.JWT_RANDOM_TOKEN,
            { expiresIn: '24h'})
         
        })
     
      })
      .catch(error => res.status(500).json({ error }));
  })
  
  }
   
 //*************************************MODIFICATION PROFIL**************************************************/

 exports.modifyCount= (req, res) => {
  try{
 // console.log("req.params.id---->", id)
 console.log("req.body--->", req.body)
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const password= req.body.password;

  const id = {
    iduser: req.params.iduser
   } ;
   
   db.query("UPDATE user SET  nom=?, prenom=?, email=? WHERE iduser=? ", [nom, prenom, email, id["iduser"] ], (err, result)=>{
     
   //  console.log("result--->", result)
     if(err) {
      console.log(err)
     }else {
   // res.send(result)
    res.status(200).json({message: 'Modification effectuée !'})
     }
   })
  }catch (err) {
    res.status(409).json({ message: "Failed registration", err });
  }
};

//************************************GET USER*******************************************************************/
exports.getUser = (req, res) => {
  //console.log("req.params--->", req.params)
//console.log("req.body--->", req.body)
const iduser= req.params.iduser;
//console.log("iduser--->", iduser)
const id = {
 iduser: req.params.iduser
} 
db.query("SELECT * FROM user WHERE iduser=?", id["iduser"], (err, result)=> {
  if(err){
    //console.log(err)
  } else {
    res.send(result)
   // console.log("result--->",result)
  }
})
}
//*******************************DELETE USER *************************************************************/
exports.deleteUser = (req, res) => {
const iduser = req.params.iduser;
console.log("iduser--deleteBack-->", iduser)
db.query("DELETE FROM user WHERE iduser=?", [iduser], (err, result)=> {
  if(err){

  } else {
    res.send(result)
  }
})
}