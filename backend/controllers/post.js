const db = require('../data/databaseConnect.js');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    let { body, file } = req;
    if (!file) delete req.body.post_image;
    console.log("req.body---postJS-->", body)
   
    const sqlInsert = "INSERT INTO post SET ?";
  db.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    console.log("res--postJS-->", res)
    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getPost = (req, res) => {
 // console.log(req)
//console.log("req.params--getPost-->", req.params)
  db.query("SELECT * FROM post INNER JOIN user ON post.iduser = user.iduser ORDER BY id DESC" , (err, result)=> {
    if(err){
   //   console.log(err)
    } else {
      res.send(result)
   //   console.log("result---postBack--->",result)
    }
  })
 
  }