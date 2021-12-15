//**utilisation express pour pouvoir créer un router */
const express = require('express');
const router = express.Router();


const passwordControl = require('../middleware/password');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth.js')


router.post('/signup', passwordControl, userCtrl.signup);
router.post('/login',  userCtrl.login);
router.put('/modification/:iduser',auth, userCtrl.modifyCount );
router.get('/get/:iduser', userCtrl.getUser)
router.delete('/delete/:iduser', auth, userCtrl.deleteUser)


module.exports = router;
