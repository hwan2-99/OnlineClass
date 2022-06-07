const express = require("express");
const router = express.Router();
const pool = require("../../config/dbConfig");

const profService = require("./prof.service");

router.post("/upload/video", async (req, res) => {
  try {
    console.log(req.body);

    // const result = await profService.videoUpload(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
