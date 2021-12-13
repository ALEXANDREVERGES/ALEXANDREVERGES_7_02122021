//**utilisation express pour pouvoir créer un router */
const express = require('express');
const router = express.Router();


const passwordControl = require('../middleware/password');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth.js')


router.post('/signup', passwordControl, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/modification', userCtrl.modifyCount );
router.get('/get/:iduser', userCtrl.getUser)

module.exports = router;
