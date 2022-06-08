import React from "react";
import classes from "./VideoMain.module.css";
import { Link, Outlet, useParams } from "react-router-dom";

const VideoMain = () => {
  const { classnum } = useParams();
  return (
    <div className={classes.wrpper}>
      <h1>강의 목록</h1>
      <hr />
      <h1>클래스 번호 {classnum}</h1>
      <h2>강의명</h2>
      <h3>강의 설명</h3>
      <hr />
      동영상 나불나불
    </div>
  );
};

export default VideoMain;
