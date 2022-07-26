import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "../hooks/Hooks";
import "../styles/Content.css";


const Login = () => {
  const state = useContext(AuthContext);
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/user/login", {
        email: email.value,
        password: password.value,
      })
      .then((user) => {
        state.toggleAuth(user.data.name);
        localStorage.setItem("user", JSON.stringify(user.data));
      })
      .then(() => navigate("/"))
      .catch(() => alert("Email or Password must be wrong"));
  };

  return (
    <form className="regContainer" onSubmit={handleSubmit}>
    <div className="col-md-4">
    <label for="exampleInputPassword1" class="form-label labels"></label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
        placeholder="Email address"
        {...email}
      />
<label for="exampleInputPassword1" class="form-label labels"></label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword1"
        required
        placeholder="Password"
        {...password}
      />

      <div className="btnL">
        <button type="submit" class="btn btn-primary bot2">
          logging
        </button>

        <Link to="/register">
          <button type="submit" class="btn btn-primary bot2">
            Don't have an acount?
          </button>
        </Link>
      </div>
      </div>
    </form>
  );
};

export default Login;
