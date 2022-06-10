import React from "react";
import { Link, Outlet } from "react-router-dom";
import RegisterCourse from "../component/stud/RegisterCourse";

const Student = () => {
  return (
    <>
    <div>
      <div>로고</div>
      <Link to="class:1">강좌목록</Link>
      <div>
        내가 듣는 강좌 목록
        <Outlet/>
      </div>
      <RegisterCourse/>
    </div>
    </>
    
  );
};

export default Student;
