import React, { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext copy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });
  const { user, loading, dispatch, error } = useContext(AuthContext);
  const naviagte = useNavigate();
  const handlerChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value, // Removed the wrapping array
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credential);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        naviagte("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not Allowed" },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  console.log(user);
  return (
    <div className="login">
      <div className="Container">
        <input
          type="text"
          placeholder="UserName"
          id="username"
          onChange={handlerChange}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlerChange}
          className="Password"
        />
        <button disabled={loading} onClick={handleClick} className="button">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
