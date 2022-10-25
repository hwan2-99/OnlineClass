import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Progress } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import classes from "./CourseVideo.module.css";
import BasicModal from "../../layout/BasicModal";
import studHandler from "../../lib/handler/studHandler";
import QASend from "../form/QASend";
import dateToUse from "../../lib/date";
import ReactPlayer from "react-player";

const CourseVideo = () => {
  const location = useLocation();
  const videoRef = useRef();
  const studNum = useSelector((state) => state.num);
  const [secList, setSecList] = useState([{}]);
  const [section, setSection] = useState({
    sec_content: "",
    sec_end: "",
    sec_num: null,
    sec_start: "",
    video_num: null,
  });
  const [loading, setLoading] = useState(true);
  const [qaList, setList] = useState([]);
  const [percent, setPercent] = useState([]);

  //videoState
  const [videoState, setVideoState] = useState({
    playing: true, // 재생중인지
    muted: false, // 음소거인지
    controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
    volume: 0.5, // 볼륨크기
    playbackRate: 1.0, // 배속
    played: 0, // 재생의 정도 (value)
    seeking: false, // 재생바를 움직이고 있는지
    duration: 0, // 전체 시간
    currentTime: 0,
  });

  const pauseHandler = () => {
    console.log("영상이 정지 됨");
    // const time = 12000;

    // //FAQ를 나타내는 로직필요
    // if (time < section.end) {
    //   setSection(secList[0]);
    // } else {
    //   setSection(secList[1]);
    // }

    // console.log(videoRef.current);
  };

  const onProgressHandler = (state) => {
    //퍼센트 계산
    setPercent(
      Math.round((state.playedSeconds / videoRef.current.getDuration()) * 100)
    );
    setVideoState({
      ...videoState,
      currentTime: state.playedSeconds,
    });
    //퍼센트 따라서 progress 바꾸면 되겠네
  };

  //멈췄다 실행했다.
  const playPauseHandler = () => {
    setVideoState({
      ...videoState,
      playing: !videoState.playing,
    });

    console.log(videoState);
  };

  const { video_num, video_order, video_title, video_filename } =
    location.state;

  const getVideoSection = async (num) => {
    const result = await studHandler.getVideoSecList(num);
    console.log("db 결과", result);
    setSecList(result);
    setSection(result[0]);
  };

  const loadList = async (num) => {
    setLoading(true);
    if (secList.length > 0) {
      const result = await studHandler.getSecFAQList(num);
      console.log("65: 결과", result);
      setList(result);
    }
    setLoading(false);
  };

  const setSectionHandler = (sec) => {
    setSection(sec);
    loadList(sec.sec_num);
  };

  //비디오 섹션 불러오는 EFFECT
  //섹션 FAQ를 불러오는 EFFECT
  useEffect(() => {
    try {
      setLoading(true);
      getVideoSection(video_num);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
            ref={videoRef}
            height="400px"
            url={`http://localhost:5000/stud/video/${video_filename}`}
            playing={videoState.playing}
            muted={videoState.muted}
            controls={videoState.controls}
            poster={"../../asset/asset/play"}
            volume={videoState.volume}
            light={true}
            onPause={pauseHandler}
            onProgress={onProgressHandler}
          />
          <div>
            {!videoState.playing ? (
              <CaretRightOutlined onClick={playPauseHandler} />
            ) : (
              <PauseOutlined onClick={playPauseHandler} />
            )}

            <Progress percent={percent} steps={secList.length} />
          </div>
        </section>
      </div>
      <div className={classes["FAQ-wrapper"]}>
        <section>
          <h2>FAQ</h2>

          {!loading && (
            <>
              {secList.map((sec) => {
                return (
                  <Button
                    onClick={(e) => {
                      setSectionHandler(sec);
                    }}
                    block
                    type="dashed"
                  >
                    {sec.sec_content}
                  </Button>
                );
              })}
              <BasicModal title={"Q&A 보내기"}>
                <h3>Q&A보내기</h3>
                <hr />
                <QASend
                  info={{
                    sec_num: section.sec_num,
                    std: studNum,
                    vid: video_num,
                    vid_stop_time: videoState.currentTime,
                  }}
                />
              </BasicModal>
            </>
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
