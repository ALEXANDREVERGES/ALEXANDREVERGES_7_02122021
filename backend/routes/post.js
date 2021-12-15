const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config.js')
const auth = require('../middleware/auth.js');
const postCtrl  = require('../controllers/post.js');


router.post('/post',multer,auth, postCtrl.createPost);
router.get('/get/commentaire',auth, postCtrl.getPost);


module.exports = router;
