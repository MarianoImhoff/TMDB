const S = require("sequelize");
const db = require("../db");

class Favoritos extends S.Model {}

Favoritos.init(
  {
    code: {
      type: S.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: S.STRING,
      allowNull: false,
    },
    path: {
      type: S.STRING,
      allowNull: false,
    },
    overview: {
      type: S.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "favoritos" }
);

module.exports = Favoritos;
