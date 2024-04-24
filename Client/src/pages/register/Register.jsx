import React, { useContext, useState } from "react";
import "./resgister.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    isAdmin: false,
  });
  // console.log(credential);
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
    console.log(credential)
    try {
      await axios.post("https://hotelbooking-api-bdtf.onrender.com/api/auth/register", credential);
      toast.success("Register Successfully")
      naviagte("/login");
    } catch (error) {
      toast.success("Somthing went Wrong")
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h2 id="h2">Register</h2>
      <div className="Container">
        <input
          type="text"
          placeholder="UserName"
          id="username"
          onChange={handlerChange}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handlerChange}
          className="email"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlerChange}
          className="Password"
        />
        <Link to={"/login"}>
          <button onClick={handleClick} className="button">
            Sign Up
          </button>
        </Link>
        <Link id="signIn" to={'/login'}>
          Sign In
        </Link>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
