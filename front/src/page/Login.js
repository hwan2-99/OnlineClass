import React from "react";
import LoginForm from "../component/form/LoginForm";
import classes from "./stylesheet/page.module.css";

const Login = () => {
  return (
    <div className={classes.wrapper}>
      <h1>로그인 페이지</h1>
      <hr />
      <div className={classes["login-wrapper"]}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
