// Modules
const dotenv =require("dotenv");
dotenv.config();

const express = require("express");
const session = require("express-session");
const router = require("./router");
const loadSessionUserInLocals = require("./services/loadSessionUserInLocals");
const rateLimit = require('express-rate-limit');


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

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 6 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 6 minutes)
  message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(loadSessionUserInLocals);

// Apply the rate limiting middleware to all requests
app.use(limiter)
// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
