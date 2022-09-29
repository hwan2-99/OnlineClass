const express = require("express");
const router = express.Router();
const profService = require("./prof.service");
const multer = require("multer");

router.post("/upload/video", async (req, res) => {
  let path = req.query.path;
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `${path}`); //업로드 파일의 저장 위치를 설정
    },
    filename: (req, file, callback) => {
      callback(null, `${file.originalname}`); // 파일이 저장될 때 이름 설정
    },
  });

  const limits = {
    files: 50,
    fileSize: 1024 * 1024 * 1024, //1G
  };

  const upload = multer({ storage, limits }).any();

  const reqFiles = [];

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].fileName);
    }

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: reqFiles,
    });
  });
});
// router.post("/upload/video", async (req, res) => {
//   try {

//     const result = await profService.videoUpload(req.query.path);

//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/class", async (req, res) => {
  try {
    const result = await profService.insertClass(req.body);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "강의 오픈 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/class/:classnum", async (req, res) => {
  try {
    const { classnum } = req.params;
    const result = await profService.getClassInfo(classnum);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "강의 정보 불러오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/class/list", async (req, res) => {
  try {
    console.log(req.params);
    const result = await profService.getAllClassList();
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/video/list/:classnum", async (req, res) => {
  try {
    console.log(req.params);
    const { classnum } = req.params;
    const result = await profService.getMyVideoInfo(classnum);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/class/list/:profnum", async (req, res) => {
  try {
    console.log(req.params);
    const result = await profService.getProfClassList(req.params.profnum);
    console.log(result);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

module.exports = router;
