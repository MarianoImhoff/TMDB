const Users = require("./Users.js");
const Favoritos = require("./Favoritos.js");

Favoritos.belongsToMany(Users, { through: "favoritos_x_users" });

module.exports = { Users, Favoritos };
