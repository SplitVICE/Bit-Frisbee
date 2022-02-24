const express = require('express');
const router = express.Router();
const path = require('path');

// Returns a status to check if server is up
router.get('/api/ping', (req, res) => { res.json({ status: 'up', description: 'server is up and running' }); });

/**
 * Returns file size limit information.
 * @returns {Object}
 * @property {Number} bytes file size limit expressed in bytes.
 */
router.get('/api/file-size-limit', (req, res) => { res.json({ bytes: require('../config/env').FILE_SIZE_LIMIT }); });

// Renders SPA/VUE frontend build project
router.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });

module.exports = router;
