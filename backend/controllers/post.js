const db = require('../data/databaseConnect.js');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  const commentaire = req.body.commentaire;
  const iduser = req.body.iduser;
  const images = req.body.images;
  console.log("req.body---postJS-->", req.body)
  db.query("INSERT INTO post (commentaire, iduser, images) VALUES(?,?,?)",[commentaire, iduser, images], (err, result) => {
  if(err){
    res.status(400).json({err});
  } 
    res.status(200).json({message : "Publication effectuée !" });
  
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
     console.log("result---postBack--->",result)
    }
  })
 
  }