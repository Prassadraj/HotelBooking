import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { IoLogOutSharp } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const naviagte = useNavigate();
  const { user, loading, dispatch, error } = useContext(AuthContext);
  // console.log(user.details.username);
  const handleClick =  (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });

    naviagte("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="lin" to="/">
          <span className="logo">Stay Finder</span>
        </Link>
        {user ? (
          <div className="user">
            <h4>User:{user.details.username}</h4>
            <FontAwesomeIcon style={{cursor:"pointer",fontSize:"25px"}} onClick={handleClick} icon={faRightFromBracket} />
          </div>
        ) : (
          <div className="navItems">
            {/* <Link to={"/register"}>
              <button className="navButton">Register</button>
            </Link>

            <Link to={"/login"}>
              <button className="navButton">Login</button>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
