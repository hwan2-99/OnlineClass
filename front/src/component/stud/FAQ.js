import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasicModal from "../../layout/BasicModal";
import dateToUse from "../../lib/date";
import studHandler from "../../lib/handler/studHandler";
import QASend from "../form/QASend";

const FAQ = (props) => {
  const tag = props.tag;
  const videonum = props.videonum;
  const studnum = useSelector((state) => state.num);

  const [loading, setLoading] = useState(false);
  const [qaList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await studHandler.getTagFAQList(tag);
        setList(result);
      };
      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [tag]);

  return (
    <div>
      <BasicModal title={"Q&A 보내기"}>
        <h3>Q&A보내기</h3>
        <hr />
        <QASend info={{ tag: tag, std: studnum, vid: videonum }} />
      </BasicModal>
      <br />
      {!loading && (
        <>
          {qaList.map((qa) => {
            return (
              <div key={qa.qa_num}>
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
  );
};

export default FAQ;
