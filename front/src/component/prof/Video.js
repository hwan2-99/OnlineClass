import { Button } from "antd";
import classes from "./video.module.css";

const Video = (props) => {
  const { order, title, uploadDate, views } = props;

  return (
    <>
      <h1>{title}</h1>
      <div className={classes.wrapper}>
        <h3> 제 {order} 강 </h3>
        <p> 업로드 날짜 {uploadDate} </p>
        <p> 조회수: {views}회</p>
      </div>
      <div className={classes.wrapper}>
        <Button>Q&A 관리</Button>
        <Button>Section 관리</Button>
        <Button>강의 정보 관리</Button>
      </div>

      <hr />
    </>
  );
};

export default Video;
