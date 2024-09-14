const express=require('express');
const router=express.Router();
const { createList,getAllList,deleteList }  = require("../controllers/listAPI");

// url starts with list/*
router.post('/create',createList);
router.get('/getLists',getAllList);
router.delete('/deleteList',deleteList);

module.exports = router;
