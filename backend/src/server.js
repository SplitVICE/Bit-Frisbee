const express = require('express');
const app = express();
const path = require('path');
const env = require('./config/env');
const fs = require('fs');
const cors = require('cors');

// SETTINGS
app.set('port', env.PORT);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// ROUTES
app.use(require('./routes/routes.files'));
app.use(require('./routes/routes.index'));

// Creates where files are stored if directory does not exist
if (!fs.existsSync(path.join(__dirname, '/public/f'))) fs.mkdirSync(path.join(__dirname, '/public/f'));

module.exports = app;