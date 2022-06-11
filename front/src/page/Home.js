import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const curState = useSelector((state) => state);

  console.log(curState);

  return (
    <div>
      <h1>홈페이지</h1>
      <h1>앞으로 어떻게 만들까? ㅎㅎ..</h1>
      <h1>유저 정보 </h1>
      <div>
        <li>이름 : {curState.name}</li>
        <li>교수 : {curState.isProf === true ? "yes" : "no"}</li>
        <li>번호 : {curState.num}</li>
      </div>
      {!curState.isLogIn && (
        <div>
          <Link to={"log"}>로그인</Link>
          <Link to={"signup"}>회원가입</Link>
        </div>
      )}
      <h1>TodoList</h1>
      <ol>
        <li>라우터 설정 교수 학생</li>
        <li>동영상 업로드 만들기</li>
        <li>Q&A 만들기</li>
        <li>전체적인 레이아웃 구성</li>
        <li>강의 신청 해놓기</li>
      </ol>
    </div>
  );
};

export default Home;
