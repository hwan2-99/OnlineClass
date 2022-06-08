import React from "react";
import { Link } from "react-router-dom";

const ClassList = () => {
  return (
    <div>
      <h1>강좌목록</h1>
      <hr />
      <h1>강좌 1</h1>
      <Link to="class:1">강좌 이동</Link>
      <hr />
      <h1>강좌 2</h1>
      <Link to="class:2">강좌 이동</Link>
      교수 번호를 이용해서 강좌 리스트를 뽑아오고 그 강좌의 클릭 이벤트를
      이용해서 강의로 넘긴다.
    </div>
  );
};

export default ClassList;
