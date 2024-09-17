const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTask,
  deleteTask,
} = require("../controllers/taskAPI");

// url starts with list/*
router.post("/createTask", createTask);
router.get("/getTasks", getAllTask);
router.delete("/deleteTask", deleteTask);

module.exports=router;
