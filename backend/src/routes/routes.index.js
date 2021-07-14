const express = require('express');
const router = express.Router();
const path = require('path');

// Returns a status to check if server is up
router.get('/api/ping', (req, res) => { res.json({ status: 'up', description: 'server is up and running' }); });

// Renders SPA/VUE frontend build project
router.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });

module.exports = router;