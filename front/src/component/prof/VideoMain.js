import React, { useEffect, useState } from "react";
import classes from "./VideoMain.module.css";
import { useParams } from "react-router-dom";
import VideoUpload from "../form/VideoUploadForm";
import BasicModal from "../../layout/BasicModal";
import profHandler from "../../lib/handler/profHandler";

const VideoMain = () => {
  const { classnum } = useParams();
  const [video_list, setVideoList] = useState([]);

  useEffect(() => {
    const getClassVideo = async (classnum) => {
      const result = await profHandler.getMyVideoList(classnum);
      return result;
    };

    const v_list = getClassVideo(classnum);
    console.log(v_list);

    setVideoList(v_list);
  }, [classnum]);

  return (
    <div className={classes.wrpper}>
      <h1>강의 목록</h1>
      <hr />
      <h1>클래스 번호 {classnum}</h1>
      <h2>강의명</h2>
      <h3>강의 설명</h3>
      <hr />
      동영상 나불나불
      <BasicModal title={"영상업로드"}>
        <VideoUpload />
      </BasicModal>
      <h1>동영상 관리 있어야함</h1>
    </div>
  );
};

export default VideoMain;
