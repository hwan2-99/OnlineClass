import { Button } from "antd";
import BasicModal from "../../layout/BasicModal";
import SectionAdd from "../form/SectionAdd";
import QaManage from "./QaManage";
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
        <BasicModal title={"질의응답 관리"}>
          <QaManage video_num={props.num} />
        </BasicModal>
        <BasicModal title={"섹션 추가"}>
          <SectionAdd video_num={props.num} />
        </BasicModal>
        <Button>강의 정보 관리</Button>
      </div>

      <hr />
    </>
  );
};

export default Video;
