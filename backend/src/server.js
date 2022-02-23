const express = require('express');
const app = express();
const path = require('path');
const ENV = require('./config/env');
const CONSTANTS = require('./config/constants');
const fs = require('fs');
const cors = require('cors');

// SETTINGS
app.set('port', ENV.PORT);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(CONSTANTS.FILE_STORAGE_FOLDER));
app.use(cors());

// ROUTES
app.use(require('./routes/files'));
app.use(require('./routes/index'));

// Creates where files are stored if directory does not exist.
if (!fs.existsSync(CONSTANTS.FILE_STORAGE_FOLDER)) fs.mkdirSync(CONSTANTS.FILE_STORAGE_FOLDER);

module.exports = app;
