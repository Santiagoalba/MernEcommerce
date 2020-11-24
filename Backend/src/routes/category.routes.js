const express = require("express");
const router = express.Router();
const { create, getCategories } = require("../controllers/category.controller");
const { isAdmin, authenticated } = require('../helpers/auth');
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

router.post("/category/create",authenticated, isAdmin, upload.single('categoryPicture'), create);
router.get("/category/get", getCategories);

module.exports = router;
