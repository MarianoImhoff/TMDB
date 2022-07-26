import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useInput from "../hooks/Hooks";
import "../styles/Content.css";

const Logging = () => {
  const name = useInput();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/user/register", {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then((info) => {
        if (info.data === "Users exist") {
          alert(info.data);
          window.location.reload();
        } else {
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="regContainer" onSubmit={handleSubmit}>
      <div className="col-md-4">
        <label for="validationCustom01" class="form-label labels"></label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          required
          placeholder="Name"
          {...name}
        />

        <label for="exampleInputEmail1" className="form-label labels"></label>
        <input
           type="email" 
           className="form-control" 
    id="exampleInputEmail1" 
          required
          placeholder="Email"
          {...email}
        />

        <label for="exampleInputPassword1" className="form-label labels"></label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          placeholder="Password"
          {...password}
        />
      </div>

      <div className="btnL">
        <button type="submit" class="btn btn-primary bot2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Logging;
