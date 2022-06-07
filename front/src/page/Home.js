import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state);
  console.log(user);

  return (
    <div>
      <h1>홈페이지</h1>
      <h1>앞으로 어떻게 만들까? ㅎㅎ..</h1>
      <h1>유저 정보 </h1>
    </div>
  );
};

export default Home;
