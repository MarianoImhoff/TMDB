import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "../hooks/Hooks";
import "../styles/Content.css";

const Navbar = () => {
  const { isAuthenticated, user, toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchFriend = useInput()
 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchUser/${searchFriend.value}`);
  };
  const logoutUser = () => {
    toggleAuth();
    axios
      .post("http://localhost:8080/api/user/logout")
      .then(() => localStorage.removeItem("user"))
      .then(() => navigate("/"));
  };

  return (
    <nav className="navbar has-background-black-ter nav">
      <div className="nombreNav">
        <Link to="/">
          <h2 className="navbar-item "  >
            Tulipan Video
          </h2>
        </Link>
      </div>
        {isAuthenticated ? (

          <div className="subNav">
          <div className="subNav1">
              <form onSubmit={handleSubmit}>
                <input className="searchF" placeholder="Search friends" {...searchFriend} />
              </form>
              </div>
              <div className="subNav2">
                <Link to={`/${user}`}>
                  <h3>Welcome {user.toUpperCase()}</h3>
                </Link>
                </div>
                <div className="subNav3">
              <Link to="/">
                <button onClick={logoutUser} class="btn">
                  {" "}
                  Logout{" "}
                </button>
              </Link>
            </div>
            </div>
        ) : (
          <div className="subNav">
            <div className="subNav1">
              <form onSubmit={handleSubmit}>
                <input className="searchF" placeholder="Search a friend" {...searchFriend} />
              </form>
            </div>
            <div className="subNav3">
              <Link to="/login">
                <button class="btn">Login</button>
              </Link>
            </div>
          </div>
        )}
      
    </nav>
  );
};

export default Navbar;
