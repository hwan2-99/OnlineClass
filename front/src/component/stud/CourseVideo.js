import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Progress } from "antd";
import { red, green } from "@ant-design/colors";
import classes from "./CourseVideo.module.css";
import FAQ from "./FAQ";
import BasicModal from "../../layout/BasicModal";
import studHandler from "../../lib/handler/studHandler";

const CourseVideo = () => {
  const location = useLocation();

  const studNum = useSelector((state) => state.num);
  const [tagList, setTagList] = useState([]);

  const { video_num, video_order, video_title, video_filename, video_length } =
    location.state;

  useEffect(() => {
    const getVideoTag = async () => {
      const result = await studHandler.getVideoTagList(video_num);
      console.log(result);
      setTagList(result);
    };
    getVideoTag();
  }, [video_num]);

  return (
    <div className={classes["wrapper"]}>
      <div className={classes["video-wrapper"]}>
        <h2>강의실</h2>
        <section>
          <h1>
            제{video_order} 강
            <br />
            강의 명: {video_title}
            <br />
          </h1>
          비디오 번호: {video_num}
          <hr />
          <ReactPlayer
            width="inherit"
            height="400px"
            url={`http://localhost:5000/stud/video/${video_filename}`}
            playing={false}
            controls={true}
            poster={"../../asset/asset/play"}
            light={true}
            pip={false}
          />
          <>
            <Progress percent={60} steps={30} />
          </>
        </section>
      </div>
      <div className={classes["FAQ-wrapper"]}>
        <section>
          <h2>FAQ</h2>
          <FAQ tag={tagList} videonum={video_num} />
        </section>
      </div>
    </div>
  );
};

export default CourseVideo;
