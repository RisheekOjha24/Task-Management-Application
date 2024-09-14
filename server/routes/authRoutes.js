const express = require("express");
// const User = require("../model/userSchema");
const {signin} = require("../controllers/authAPI");
const router = express.Router();

router.post("/signin", signin);

module.exports=router;