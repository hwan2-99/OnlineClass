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
  const [secList, setSecList] = useState([]);
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(false);
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
  });

  const pauseHandler = () => {
    console.log("영상이 정지 됨");
    const time = 12000;

    //FAQ를 나타내는 로직필요
    if (time < section.end) {
      setSection(secList[0]);
    } else {
      setSection(secList[1]);
    }

    console.log(videoRef.current);
  };

  const onProgressHandler = (state) => {
    //퍼센트 계산
    setPercent(
      Math.round((state.playedSeconds / videoRef.current.getDuration()) * 100) /
        10
    );

    //퍼센트 따라서 progress 바꾸면 되겠네
  };

  //멈췄다 실행했다.
  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const { video_num, video_order, video_title, video_filename, video_length } =
    location.state;
  let i = 0;

  useEffect(() => {
    const getVideoSection = async () => {
      const result = await studHandler.getVideoSecList(video_num);
      console.log("태그리스트", result);
      setSecList(result);
      setSection(secList[0]);
    };
    getVideoSection();
  }, [video_num]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        if (secList.length > 0) {
          //로딩중
          setLoading(true);
          const result = await studHandler.getSecFAQList(section.sec_num);
          console.log("65: 결과", result);
          setList(result);
        }
      };
      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [secList, section]);

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
            <BasicModal title={"Q&A 보내기"}>
              <h3>Q&A보내기</h3>
              <hr />
              {/* 이부분 수정 */}
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
