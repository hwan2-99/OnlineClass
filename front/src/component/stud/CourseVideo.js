import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Progress, Slider } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  SoundOutlined,
  SoundFilled,
} from "@ant-design/icons";
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
  // const [secList, setSecList] = useState([{}]);
  // const [section, setSection] = useState({
  //   sec_content: "",
  //   sec_end: "",
  //   sec_num: null,
  //   sec_start: "",
  //   video_num: null,
  // });
  const [loading, setLoading] = useState(true);
  const [qaList, setList] = useState([]);
  const [percent, setPercent] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const toggleMuteHandler = () => {
    setVideoState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
    }));
  };
  const handleRestButtonClick = () => {
    // '나머지' 버튼을 클릭했을 때 실행되는 로직 작성
  };

  const handleProblemButtonClick = () => {
    // '문제' 버튼을 클릭했을 때 실행되는 로직 작성
  };

  const handleNoteButtonClick = () => {
    // '노트' 버튼을 클릭했을 때 실행되는 로직 작성
  };

  const handleQualityButtonClick = () => {
    // '퀄리티' 버튼을 클릭했을 때 실행되는 로직 작성
  };
  const playHandler = () => {
    setShowButtons(false);
    setShowControls(false); // 버튼이 사라지면 컨트롤 바도 사라지도록 설정
  };
  const pauseHandler = () => {
    // 동영상이 정지됐을 때 실행되는 로직
    setShowButtons(true);
    setShowControls(true); // 버튼이 보이는 동안은 컨트롤 바도 보이도록 설정

    const buttonRest = (
      <Button key="rest" className={classes["video-button"]}>
        Rest
      </Button>
    );

    const buttonProblem = (
      <Button key="problem" className={classes["video-button"]}>
        Problem
      </Button>
    );

    const buttonNote = (
      <Button key="note" className={classes["video-button"]}>
        Note
      </Button>
    );

    const buttonQuality = (
      <Button key="quality" className={classes["video-button"]}>
        Quality
      </Button>
    );
    // video-controls 요소 선택
    const videoControls = document.querySelector(
      `.${classes["video-controls"]}`
    );

    // video-controls 요소가 존재하는 경우에만 버튼 추가
    if (videoControls) {
      videoControls.appendChild(buttonRest);
      videoControls.appendChild(buttonProblem);
      videoControls.appendChild(buttonNote);
      videoControls.appendChild(buttonQuality);
    }
  };

  const onVolumeChangeHandler = (value) => {
    setVolume(value);
    setVideoState((prevState) => ({
      ...prevState,
      volume: value,
    }));
  };
  const onMouseEnterHandler = () => {
    setShowControls(true);
  };

  const onMouseLeaveHandler = () => {
    setShowControls(false);
  };

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

  const onProgressHandler = (state) => {
    //퍼센트 계산
    setPercent(
      Math.round((state.playedSeconds / videoRef.current.getDuration()) * 100)
    );
    setVideoState({
      ...videoState,
      currentTime: state.playedSeconds,
    });
    setCurrentTime(state.playedSeconds); // 추가된 부분
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

  const {
    video_num,
    video_order,
    video_title,
    video_filename,
  } = location.state;

  const onSeekHandler = (value) => {
    videoRef.current.seekTo(value);
    setVideoState({
      ...videoState,
      currentTime: value,
    });
  };

  const getVideoSection = async (num) => {
    const result = await studHandler.getVideoSecList(num);
    console.log("db 결과", result);
    // setSecList(result);
    // setSection(result[0]);
  };

  // const loadList = async (num) => {
  //   setLoading(true);
  //   if (secList.length > 0) {
  //     const result = await studHandler.getSecFAQList(num);
  //     console.log("65: 결과", result);
  //     setList(result.filter((qa) => qa.qa_response_yn === 1));
  //   }
  //   setLoading(false);
  // };

  // const setSectionHandler = (sec) => {
  //   setSection(sec);
  //   loadList(sec.sec_num);
  // };

  //비디오 섹션 불러오는 EFFECT
  //섹션 FAQ를 불러오는 EFFECT
  useEffect(() => {
    try {
      setLoading(true);
      getVideoSection(video_num);
      setList([]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [video_num]);

  return (
    <div className={classes["wrapper"]}>
      <div
        className={classes["video-wrapper"]}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div
          className={classes["video-wrapper"]}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        ></div>
        <h2>강의실</h2>
        <section>
          <h1>
            제{video_order} 강
            <br />
            강의 명: {video_title},{video_filename}
            <br />
          </h1>
          비디오 번호: {video_num} / {video_filename}
          <hr />
          <ReactPlayer
            width="inherit"
            ref={videoRef}
            height="400px"
            url={`http://localhost:3000/${video_filename}.mp4`}
            playing={videoState.playing}
            muted={videoState.muted}
            onPlay={playHandler}
            controls={videoState.controls}
            poster={"../../asset/asset/play"}
            volume={videoState.volume}
            light={true}
            onPause={pauseHandler}
            onProgress={onProgressHandler}
          />
          {showButtons && (
            <div className={classes["video-controls"]}>
              <div className={classes["control-item"]}>
                {videoState.muted ? (
                  <SoundOutlined onClick={toggleMuteHandler} />
                ) : (
                  <SoundFilled onClick={toggleMuteHandler} />
                )}
              </div>
              <div className={classes["control-item"]}>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={onVolumeChangeHandler}
                  vertical
                />
              </div>
              <div className={classes["control-item"]}>
                <Slider
                  min={0}
                  max={videoRef.current ? videoRef.current.getDuration() : 0}
                  step={0.1}
                  value={currentTime}
                  onChange={onSeekHandler}
                  tooltipVisible={false}
                />
              </div>
              <button className={classes["control-button"]}>rest</button>
              <button className={classes["control-button"]}>problem</button>
              <button className={classes["control-button"]}>note</button>
              <button className={classes["control-button"]}>quality</button>
            </div>
          )}
          <div>
            {!videoState.playing ? (
              <CaretRightOutlined onClick={playPauseHandler} />
            ) : (
              <PauseOutlined onClick={playPauseHandler} />
            )}

            {/* <Progress percent={percent} steps={secList.length} /> */}
          </div>
        </section>
      </div>
      <div className={classes["FAQ-wrapper"]}>
        <section>
          <h2>FAQ</h2>
          {/* {secList.length === 0 && <h1> 섹션이 생성 되지 않았습니다.</h1>}
          {!(secList.length === 0) && (
            <>
              {secList.map((sec) => {
                return (
                  <div key={sec.sec_num}>
                    <Button
                      onClick={(e) => {
                        setSectionHandler(sec);
                      }}
                      block
                      type="dashed"
                    >
                      {sec.sec_content}
                    </Button>
                  </div>
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
          )} */}

          <div className={classes["qa-wrapper"]}>
            <br />
            {!loading && (
              <>
                {qaList.length === 0 && <h1> Q&A가 없습니다.</h1>}
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
            <div className={classes["video-overlay"]}>
              {" "}
              <p className={classes["current-time"]}>{currentTime}</p>{" "}
            </div>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseVideo;
