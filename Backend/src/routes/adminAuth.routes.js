const express = require('express');
const router = express.Router();
const { authenticated } = require('../helpers/auth');

const {
    index, signIn, signUp
} = require('../controllers/adminAuth.controller');

router.get('/', index);

router.post('/admin/signin', signIn);
router.post('/admin/signup', signUp);


module.exports = router;