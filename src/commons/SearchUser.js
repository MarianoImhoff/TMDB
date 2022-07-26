import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user")).id;
    axios
      .get(`http://localhost:8080/api/user/${user}/${userStorage}`)
      .then((info) => setUsers(info.data));
  }, []);

  return (
    <div class="container mx-auto mt-4 movie-grid">
      
    {users.map((user, i) => {
      return (
        <div className="card"  >
          <img className="img"
            src={`https://image.tmdb.org/t/p/w300${user.path}`}
            alt="imagen"
          />
          <div className="card-body">
            <h5 className="card-title ">{user.title}</h5>
            <p className="card-text">{user.overview}</p>
          </div>
        </div>
      );
    })} 
</div>
  );
};

export default SearchUser;
