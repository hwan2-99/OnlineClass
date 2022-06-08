import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profHandler from "../../lib/handler/profHandler";

const ClassList = () => {
  //교수 번호 가져오기
  const num = useSelector((state) => state.num);

  const [classList, setList] = useState([]);

  useEffect(() => {
    const loadList = async () => {
      const result = await profHandler.getClassList(num);
      setList(result);
      console.log(classList);
    };
    loadList();
    //강좌 목록 가져오기
  }, []);

  return (
    <div>
      <h1>강좌목록</h1>
      <hr />
      {classList.map((course) => {
        return (
          <div key={course.course_num}>
            <p>{course.course_name}</p>
            <Link to={`class:${course.course_num}`}>강좌 이동</Link>
            <hr />
          </div>
        );
      })}
      교수 번호를 이용해서 강좌 리스트를 뽑아오고 그 강좌의 클릭 이벤트를
      이용해서 강의로 넘긴다.
      <hr />
      <Link to="open">강좌 개설</Link>
    </div>
  );
};

export default ClassList;
