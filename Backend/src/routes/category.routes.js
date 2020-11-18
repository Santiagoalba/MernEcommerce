const express = require("express");
const router = express.Router();
const { create, getCategories } = require("../controllers/category.controller");
const { isAdmin, authenticated } = require('../helpers/auth');


router.post("/category/create", authenticated, isAdmin, create);
router.get("/category/get", getCategories);

module.exports = router;
