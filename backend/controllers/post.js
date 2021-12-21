const db = require('../data/databaseConnect.js');
const fs = require('fs');

exports.createPost = (req, res) => {
  const commentaire = req.body.commentaire;
  const iduser = req.body.iduser;
  const images = req.body.images;
  
  db.query("INSERT INTO post (commentaire, iduser, images) VALUES(?,?,?)",[commentaire, iduser, images], (err, results) => {
  if(err){
    res.status(400).json({err});
  } 
 if(results){
     res.status(200).json({message : "Publication effectuée !" });
  
 }
  
})
}



exports.getPost = (req, res) => {
 // console.log(req)
//console.log("req.params--getPost-->", req.params)
  db.query("SELECT * FROM post INNER JOIN user ON post.iduser = user.iduser ORDER BY id DESC" , (err, result)=> {
    if(err){
   //   console.log(err)
    } else {
      res.send(result)
     
    }
  })
 
  }
  exports.getOnePost = (req, res) => {
    // console.log(req)
   //console.log("req.params--getPost-->", req.params)
   const id = req.params.id;
     db.query("SELECT * FROM post INNER JOIN user ON post.iduser = user.iduser WHERE id=?" , [id],(err, result)=> {
       if(err){
      //   console.log(err)
       } else {
         res.send(result)
        console.log(result)
       }
     })
    
     }
     /**************************************************** */
     exports.deleteCom = (req, res) => {
      const id = req.params.id;
      const iduser = req.params.iduser;
      const idcom = req.params.iduser;
      console.log("id_com--deleteBack-->", id)
      console.log("iduser--deleteBack-->", iduser)
     db.query("DELETE FROM post WHERE id=?", [id] , (err, result)=> {
        if(err){
      
        } else {
          res.send(result)
        }
      })
      }