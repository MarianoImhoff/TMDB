const express = require("express");
const router = express.Router();
const User = require("./Users");
const Favoritos = require("./Favoritos");

router.use("/user", User);
router.use("/favoritos", Favoritos);

module.exports = router;
