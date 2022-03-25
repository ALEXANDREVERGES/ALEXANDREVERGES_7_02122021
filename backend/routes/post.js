const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config.js')
const auth = require('../middleware/auth.js');
const postCtrl  = require('../controllers/post.js');


router.post('/post',auth ,postCtrl.createPost);
router.get('/get/commentaire',auth, postCtrl.getPost);
router.get('/get/commentaire/:id',auth, postCtrl.getOnePost);
router.delete('/delete/:id',auth, postCtrl.deleteCom)
router.delete('/delete/compost/:id',auth, postCtrl.deleteComPost)
router.post('/post/com',auth ,postCtrl.createComPost);
router.get('/get/post/com/:idpost',auth, postCtrl.getPostCom);
router.get('/get/onepost/:id', auth, postCtrl.getOneComPost)
router.put('/update/:id',auth, postCtrl.updatePost);

module.exports = router;
