// Modules
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const router = require("./router");
const loadSessionUserInLocals = require("./services/loadSessionUserInLocals");


const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

// Configuration des sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_SESSION,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));

app.use(loadSessionUserInLocals);

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
