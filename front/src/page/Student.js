import React from "react";
import { Link, Outlet } from "react-router-dom";
import RegisterCourse from "../component/stud/RegisterCourse";
import RegisterModal from "../component/stud/RegisterModal";

const Student = () => {
  return (
    <>
      <div>
        <div>로고</div>
        <Link to="class:1">강좌목록</Link>
        <div>
          내가 듣는 강좌 목록
          <Outlet />
        </div>
        <p>강의 등록 버튼을 만들어서 렌더링을 막도록 하자</p>
        <RegisterModal>
          <RegisterCourse />
        </RegisterModal>
      </div>
    </>
  );
};

export default Student;
