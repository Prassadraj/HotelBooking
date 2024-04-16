import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
      const res = await axios.post("https://hotelbooking-api-bdtf.onrender.com/api/auth/login", credential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      naviagte("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.details });
    }
  };

  console.log(user);
  return (
    <div className="login">
      <h2 id="h2">Login</h2>
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
        <Link to={'/register'}>
        Sign Up</Link>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
