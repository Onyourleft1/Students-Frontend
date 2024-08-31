import React, { useContext, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [, setLogin] = useContext(LoginContext);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const logIn = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACK_URL}/Users/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
        setLogin(true);
        setCookie("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div id="login_container">
      <h1>Login</h1>
      <form onSubmit={logIn}>
        <div>
          <label htmlFor="eml">Email:</label>
          <input id="eml" type="text" value={email} onChange={handleEmail} />
        </div>
        <div>
          <label htmlFor="ps">Password:</label>
          <input id="ps" type="text" value={pass} onChange={handlePass} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
