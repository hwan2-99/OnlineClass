import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Progress } from "antd";
import { red, green } from "@ant-design/colors";
import classes from "./CourseVideo.module.css";
import FAQ from "./FAQ";
import BasicModal from "../../layout/BasicModal";
import studHandler from "../../lib/handler/studHandler";
import QASend from "../form/QASend";
import dateToUse from "../../lib/date";

const CourseVideo = () => {
  const location = useLocation();

  const studNum = useSelector((state) => state.num);
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState({});
  const [loading, setLoading] = useState(false);
  const [qaList, setList] = useState([]);
  const videoRef = useRef();

  const pauseHandler = () => {
    console.log("영상이 정지 됨");
    const time = 12000;

    if (time < tag.end) {
      setTag(tagList[0]);
    } else {
      setTag(tagList[1]);
    }

    console.log(videoRef.current.getCurrentTime());
  };

  const onProgressHandler = (state) => {
    console.log(state);
  };

  const { video_num, video_order, video_title, video_filename, video_length } =
    location.state;
  let i = 0;

  useEffect(() => {
    const getVideoTag = async () => {
      const result = await studHandler.getVideoTagList(video_num);
      console.log("태그리스트", result);
      setTagList(result);
      setTag(tagList[0]);
    };
    getVideoTag();
  }, [video_num]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        if (tagList.length > 0) {
          //로딩중
          setLoading(true);
          const result = await studHandler.getTagFAQList(tag.tag_num);
          setList(result);
        }
      };
      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [tagList, tag]);

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
            ref={videoRef}
            height="400px"
            url={`http://localhost:5000/stud/video/${video_filename}`}
            playing={false}
            controls={true}
            poster={"../../asset/asset/play"}
            light={true}
            pip={false}
            onPause={pauseHandler}
            onProgress={onProgressHandler}
          />
          <>
            <Progress percent={60} steps={30} />
          </>
        </section>
      </div>
      <div className={classes["FAQ-wrapper"]}>
        <section>
          <h2>FAQ</h2>
          {!loading && (
            <BasicModal title={"Q&A 보내기"}>
              <h3>Q&A보내기</h3>
              <hr />
              <QASend info={{ tag: 2, std: studNum, vid: video_num }} />
            </BasicModal>
          )}
          <div className={classes["qa-wrapper"]}>
            <br />
            {!loading && (
              <>
                {qaList.map((qa) => {
                  return (
                    <div key={qa.qa_num} className={classes.qa}>
                      <p>Q : {qa.qa_title}</p>
                      <p>내용 : {qa.qa_content}</p>
                      <p>A : {qa.qa_reply_content}</p>
                      <p>보낸 날짜 : {dateToUse(qa.qa_send_time)}</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseVideo;
