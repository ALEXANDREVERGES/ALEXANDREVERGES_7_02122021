const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config.js')
const auth = require('../middleware/auth.js');
const postCtrl  = require('../controllers/post.js');


router.post('/post',auth ,multer ,postCtrl.createPost);
router.get('/get/commentaire',auth, postCtrl.getPost);
router.get('/get/commentaire/:id',auth, postCtrl.getOnePost);
router.delete('/delete/:id',auth, postCtrl.deleteCom)

module.exports = router;
