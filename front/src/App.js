import { Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Student from "./page/Student";
import Profesor from "./page/Profesor";
import VideoMain from "./component/prof/VideoMain";
import VideoQA from "./component/prof/VideoQA";
import NotFound from "./page/NotFound";
import "antd/dist/antd.css";
import SignUp from "./page/SignUp";
import classes from "./app.module.css";
import ClassOpen from "./component/form/ClassOpen";

function App() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <h1>Interection Online Class</h1>
          <hr />
        </div>
        <div className={classes["header"]}>
          <nav className={classes["nav-item"]}>
            <Link to={"/"}>home</Link>
            <Link to={"prof"}>교수</Link>
            <Link to={"stud"}>학생</Link>
          </nav>
        </div>
        <div className={classes.main}>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="log" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="prof" element={<Profesor />}>
              <Route path="class:classnum" element={<VideoMain />} />
              <Route path="open" element={<ClassOpen />} />
            </Route>
            <Route path="stud" element={<Student />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
