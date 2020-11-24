const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), './uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage });


const { authenticated, isAdmin } = require('../helpers/auth');
const { create } = require('../controllers/product.controller');



router.post('/create/product', authenticated, isAdmin, upload.array('productPicture'), create);


module.exports = router;