const express = require("express");
const app = express();
const cors = require("cors");
const volleyball = require("volleyball");
const routes = require("./routes/index");
const db = require("./db")
const models= require("./models");
const {Users, Favoritos} = require("./models")
const PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


app.use(volleyball);
app.use(express.static("public"));
app.use(cors()); // esta librería es para poder trabajar front con back en localhost
app.use(express.json());
//desde aca
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // popula req.cookies
app.use(session({ secret: "chaito" })); // popula req.session
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      Users.findOne({where:{ email }})
        .then((user) => {
          if (!user) {
            return done(null, false); // no encontrado
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // pasword erronea
            }
            done(null, user); // encontrado
          });
        })
        .catch(done);
    }
  )
);
// guardamos el usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// buscamos el usuario
passport.deserializeUser(function(id, done) {
  Users.findByPk(id).then(user => done(null, user))
});
//hasta aca 

app.use("/api", routes); //todas las rutas empiezan con api
app.use("/", (req, res, next) => res.redirect("/api")); // me aseguro que si o si vaya para /api si entraste en otra ruta


db.sync({ force: false})
  .then(() => {
    app.listen(PORT, (req, res, next) => {
      console.log(`API on port ${PORT}`);
    });
  }) 
.catch(console.error);