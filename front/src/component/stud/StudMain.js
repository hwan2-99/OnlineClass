import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const StudMain = () => {
  const { classnum } = useParams();
  console.log(classnum);

  return (
    <div>
      <h1>클래스 보기</h1>
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    </div>
  );
};

export default StudMain;
