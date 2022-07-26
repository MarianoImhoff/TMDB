import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/Content.css";
import tvRota from "../assets/tvRota.jpg";
import { addFavorite, removeFavorites } from "../store/favorite";

const Content = () => {
  const dispatch = useDispatch();
  const [films, setFilms] = useState([]);
  const { movie } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7cbf5b5c696ab8395fd5dd2f6b402a50&query=${movie}`
      )
      .then((res) => res.data)
      .then((data) => setFilms(data.results));
  }, []);

  const handleAdd = (peli) => {
    const userStorage = JSON.parse(localStorage.getItem("user")).id;
    dispatch(
      addFavorite({
        titulo: peli.title,
        code: peli.id,
        path: peli.poster_path,
        overview: peli.overview,
        userId: userStorage,
      })
    )
    
  };

  const handleRemove = (peli) => {
    const userStorage = JSON.parse(localStorage.getItem("user")).id;
    dispatch(
      removeFavorites({
        titulo: peli.title,
        code: peli.id,
        path: peli.poster_path,
        overview: peli.overview,
        userId: userStorage,
      })
    );
  };

  return (
    <div className="container mx-auto mt-4 movie-grid">
      {films.map((film, i) => {
        return (
          <div key={i} class="card">
            {film.poster_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt="imagen"
              />
            ) : (
              <img className="img" src={tvRota} alt="iamgen" />
            )}

            <div className="card-body">
              <h5 className="card-title ">{film.title}</h5>
              <p className="card-text">{film.overview}</p>
            </div>
            <div className="btnC">
              <button
                className="btn mr-2"
                onClick={() => {
                  handleAdd(film);
                }}
              >
                <i class="fas fa-link"></i>Fav +
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleRemove(film);
                }}
              >
                <i class="fab fa-github"></i>Fav -
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
