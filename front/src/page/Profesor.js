import React from "react";
import { Link } from "react-router-dom";
import ProfLayout from "../layout/ProfLayout";

const Proffesor = () => {
  return (
    <>
      <ProfLayout />
      <div>
        <h1>교수페이지</h1>
        <ul>
          <li>강좌 개설</li>
          <li>강의 업로드</li>
          <Link to="class">강의 이동</Link>
          <li>강의 설정</li>
          <li>Q&A 관리</li>
          <li>FAQ관리</li>
        </ul>
      </div>
    </>
  );
};

export default Proffesor;
