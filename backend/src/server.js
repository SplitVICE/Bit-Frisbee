const express = require('express'),
  app = express(),
  path = require('path'),
  env = require('./config/env'),
  express_session = require('express-session'),
  fs = require('fs');

// Server settings
app.set('port', process.env.PORT || env.PORT);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) { // Accepts API requests from selected domains - cors
  res.header("Access-Control-Allow-Origin", "*"); // All domains can access
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express_session({
  secret: env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000, // 10 minutes.
    secure: false, // Only works on HTTPS
    httpOnly: true // Only readable via HTTP/S protocol. No client's JavaScript.
  }
}));

// Routes
app.use(require('./routes/routes.files'));
app.use(require('./routes/routes.index'));

// Processes
// Creates where files are stored if directory does not exist
if (!fs.existsSync(path.join(__dirname, "/public/f"))) fs.mkdirSync(path.join(__dirname, "/public/f"));

module.exports = app;