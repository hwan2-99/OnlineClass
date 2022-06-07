const express = require("express");
const { off } = require("../../app");
const router = express.Router();
const pool = require("../../config/dbConfig");

const UserService = require("./user.service");

router.post("/login", async (req, res) => {
  try {
    const result = await UserService.loginUser(req.body);

    if (result !== undefined) {
      return res
        .status(200)
        .json({ status: 200, data: result, message: "로그인 성공" });
    } else {
      return res.status(500).json({ status: 500, message: "로그인 실패" });
    }
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const result = await UserService.insertUser(req.body);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "가입 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

module.exports = router;
