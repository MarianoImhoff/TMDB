import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/Hooks";

import "../styles/Content.css";

const Header = () => {
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState([]);
  const searchMovie = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/content/${searchMovie.value}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=7cbf5b5c696ab8395fd5dd2f6b402a50`
      )
      .then((res) => res.data)
      .then((data) => setPelicula(data.results[10]));
  }, []);

  return (
    <div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w1280${pelicula.backdrop_path}`}
          class="d-block w-100"
          alt="Foto Portada"
          height="600px"
        />
        <div className="search">
          <div>
            <form className="formSearch" onSubmit={handleSubmit}>
              <input
                className="bsearch"
                placeholder="Search Movies"
                {...searchMovie}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
