import React from "react";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";

const CourseVideo = () => {
  const location = useLocation();

  const { video_num, video_order, video_title, video_filename, video_length } =
    location.state;

  return (
    <div>
      <h1>
        강의 명: {video_title}
        <br />
        비디오 번호: {video_num}
        <br />
        {video_order} 강
      </h1>
      <hr />
      <ReactPlayer
        url={`http://localhost:5000/stud/video/${video_filename}`}
        playing={false}
      />
    </div>
  );
};

export default CourseVideo;
