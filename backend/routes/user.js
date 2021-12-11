//**utilisation express pour pouvoir créer un router */
const express = require('express');
const router = express.Router();


const passwordControl = require('../middleware/password');
const userCtrl = require('../controllers/user');
const upload = require('../middleware/multer-config');


router.post('/signup', passwordControl, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('./modification', upload )

module.exports = router;
