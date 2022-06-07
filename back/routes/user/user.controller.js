const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");

const UserService = require("./user.service");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {}
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {}
});

module.exports = router;
