const express = require('express');
const router = express.Router();
const { authenticated } = require('../helpers/auth');
const { addToCart } = require('../controllers/cart.controller');

router.post('/user/cart/add-to-cart', authenticated, addToCart );


module.exports = router;