const express = require("express");
const router = express.Router();

const studService = require("./stud.service");

router.post("/register", async (req, res) => {
  try {
    const result = await studService.classRegister(req.body);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "강의 등록 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

module.exports = router;
