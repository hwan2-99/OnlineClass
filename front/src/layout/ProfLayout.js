import React from "react";
import "./ProfLayout.css";
import { Outlet, Link } from "react-router-dom";
import ClassList from "../component/prof/ClassList";
import VideoMain from "../component/prof/VideoMain";

const ProfLayout = (props) => {
  return (
    <div className="wrapper">
      <header>로고</header>
      <div className="prof-body">
        <div className="class-main">
          <ClassList />
        </div>
        <div className="video-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfLayout;
