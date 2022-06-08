import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isLogIn = useSelector((state) => {
    console.log(state);
    return state.isLogIn;
  });

  return (
    <div>
      <h1>홈페이지</h1>
      <h1>앞으로 어떻게 만들까? ㅎㅎ..</h1>
      <h1>유저 정보 </h1>
      <Link to={"log"}>로그인</Link>
      <Link to={"signup"}>회원가입</Link>
    </div>
  );
};

export default Home;
