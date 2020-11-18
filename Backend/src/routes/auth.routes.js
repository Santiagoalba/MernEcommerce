const express = require('express');
const router = express.Router();
const { authenticated } = require('../helpers/auth');
const { check } = require('express-validator');

const {
    index, signIn, signUp
} = require('../controllers/adminAuth.controller');

router.get('/', index);

router.post('/signin', signIn);

router.post('/signup', 
[
    check('firstName')
    .isEmpty()
    .withMessage('First Name is required'),
    check('lastName')
    .isEmpty()
    .withMessage('Last Name is required'),
    check('email')
    .isEmail()
    .withMessage('Invalid email format'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password should be at least 6 long')
],
 signUp);

router.post('/profile', authenticated, (req, res) => {
    res.status(200).json({
        message: 'ok'
    });
});


module.exports = router;