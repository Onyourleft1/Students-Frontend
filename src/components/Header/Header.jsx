import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { LoginContext, UserContext } from "../../App";
import axios from "axios";
import { useCookies } from "react-cookie";
function Header() {
  const [login, setLogin] = useContext(LoginContext);
  const [, setUser] = useContext(UserContext);
  const [, setCookie] = useCookies(["token"]);
  const logout = (e) => {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_BACK_URL}/Users/logout`).then(() => {
      setLogin(false);
      setUser({});
      setCookie("token", null);
    });
  };
  return (
    <div id="header_Container">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About Us</Link>
      <Link to={"/contact"}>Contact Us</Link>
      {login ? (
        <>
          <Link to={"/cart"}>Cart</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </div>
  );
}

export default Header;
