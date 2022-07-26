const { createNextState } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const express = require("express");
const favoritosRouter = express.Router();
const { Favoritos, Users } = require("../models");

favoritosRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Favoritos.findAll({ include: { model: Users, where: { id } } })
    .then((favorites) => res.status(200).send(favorites))
    .catch((error) => res.status(500).send(error));
});

favoritosRouter.put("/add", (req, res) => {
  const { code, userId } = req.body;
  Favoritos.findOne({ where: { code } }).then((favorito) => {
    if (favorito) return res.send("Already added")
    Favoritos.create(req.body).then((newFavorito) => {
      Users.findByPk(userId)
        .then((user) => newFavorito.addUser(user))
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500).send("Already added"));
    });
  });
});

favoritosRouter.delete("/remove", (req, res) => {
  const { userId, code } = req.body;
  Favoritos.destroy({ where: { code } })
    .then(() => res.sendStatus(200))
    .catch((error) => console.log(error));
});

module.exports = favoritosRouter;
