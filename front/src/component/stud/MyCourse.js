import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import studHandler from "../../lib/handler/studHandler";

const MyCourse = () => {
  const studnum = useSelector((state) => state.num);

  const [loading, setLoading] = useState(false);
  const [classList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await studHandler.getMyClassList(studnum);
        setList(result);
        console.log(result);
      };

      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <h1>로딩중</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>내가 듣는 강좌!</h1>
        {classList.map((item) => {
          return (
            <ul key={item.course_num}>
              <li>강의명 : {item.course_name}</li>
              <li>진행률 {item.prog_rate} %</li>
              <li>시작일 : {new Date(item.start_date).toUTCString()}</li>
              <Link to={`class/${item.course_num}`}>강의실 가기</Link>
            </ul>
          );
        })}
      </div>
    );
  }
};

export default MyCourse;
