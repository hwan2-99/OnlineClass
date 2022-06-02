import { Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Student from "./page/Student";
import Profesor from "./page/Profesor";
import NotFound from "./page/NotFound";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>오늘 부터 열심히 갓생 살아 보즈아!</h1>
          <Link to={"/"}>home</Link>
          <Link to={"log"}>로그인</Link>
          <Link to={"prof"}>교수</Link>
          <Link to={"stud"}>학생</Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="log" element={<Login />} />
            <Route path="prof" element={<Profesor />} />
            <Route path="stud" element={<Student />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
