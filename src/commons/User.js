import React, { useEffect, useState } from "react";
import axios from "axios";


const Usuario = () => {
  const [favoritos, setFavoritos] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem("user")).id;

  const handleRemove = (fav) => {
    axios.delete("http://localhost:8080/api/favoritos/remove", {
      data: {
        titulo: fav.titulo,
        code: fav.code,
        path: fav.path,
        overview: fav.overview,
        userId: userStorage,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/favoritos/${userStorage}`)
      .then((info) => setFavoritos(info.data));
  }, []);

  return (
    <div className="container mx-auto mt-4 movie-grid">
      {favoritos.map((favorito, i) => {
        return (
          <div className="card">
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w300${favorito.path}`}
              alt="imagen"
            />
            <div className="card-body">
              <h5 className="card-title ">{favorito.title}</h5>
              <p className="card-text">{favorito.overview}</p>
              
            </div>
            <div className="btnC">
              <button
                className="btn mr-2"
                onClick={() => {
                  handleRemove(favorito);
                }}
              >
                <i className="fas fa-link"></i>Fav -
              </button>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default Usuario;
