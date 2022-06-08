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

router.post("/class", async (req, res) => {
  try {
    const result = await profService.insertClass(req.body);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "강의 오픈 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/classlist/:profnum", async (req, res) => {
  try {
    console.log(req.params);
    const result = await profService.getClassList(req.params.profnum);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

module.exports = router;
