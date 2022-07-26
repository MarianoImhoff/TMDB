const express = require("express");
const userRouter = express.Router();
const { Users, Favoritos } = require("../models");
const passport = require("passport");
const { Op, where } = require("sequelize");

userRouter.get("/:name/:id", (req, res, next) => {
  const { name, id } = req.params;
  Favoritos.findAll({
    include: { model: Users, where: { name, [Op.not]: [{ id }] } },
  })
    .then((users) => res.send(users))
    .catch((error) => console.log(error));
});

userRouter.post("/register", (req, res, next) => {
  const { name, email } = req.body;
  Users.findAll({ where: { name, email } })
    .then((user) => {
      if (user.length == 0) {
        Users.create(req.body)
          .then((newUser) => res.status(201).send(newUser))
          .catch((error) => console.log(error));
      } else {
        res.send("Users exist");
      }
    })
    .catch((error) => console.log(error));
});

userRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.send(req.user);
});

userRouter.post("/logout", (req, res, next) => {
  req.logOut(req.user, (error) => {
    if (error) return next(error);
  });
  res.send("Deslogueado");
});

module.exports = userRouter;
