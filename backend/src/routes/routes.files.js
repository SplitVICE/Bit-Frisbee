// ========================================================================================
// CONSTANTS & SETTINGS
// ========================================================================================
const express = require("express"),
    router = express.Router(),
    path = require('path'),
    env = require('../config/env'),
    fs = require('fs'),
    multer = require('multer'),
    uniqid = require('uniqid'),
    fileExtension = require('file-extension'),
    localIpV4Address = require("local-ipv4-address"),
    files_path = path.join(__dirname, '../public/f/'); // Where files are stored

// Multer storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, files_path) },
    filename: function (req, file, cb) {
        const file_name = uniqid() + '.' + fileExtension(file.originalname); cb(null, file_name);
    }
});

// Multer middleware set
const upload = multer({ storage: storage });

let IPv4 = undefined;
(async () => { IPv4 = await localIpV4Address() })()

// ========================================================================================
// HELPER FUNCTIONS
// ========================================================================================

function get_port() {
    if (env.PORT == '80') return '' // returns nothing if port is 80
    else return env.PORT
}

function get_http_or_https() {
    if (env.USE_HTTPS.toLowerCase() == 'true') return 'https://'
    else return 'http://'
}

// ========================================================================================
// ROUTE FUNCTIONS
// ========================================================================================

// Sends the links to access all files stored
router.get('/api/files/', async (req, res) => {
    if (env.SHOW_FILES_STORED.toLowerCase() != 'true') {
        res.status(200).json({ status: 'failed', description: 'files readability disabled' }); return;
    }
    const file_names = fs.readdirSync(files_path), files = [], p = get_port(), http_s = get_http_or_https();
    file_names.forEach(item => {
        files.push(
            {
                file_name: item,
                file_path: http_s + IPv4 + ':' + p + "/f/" + item
            });
    });

    res.status(200).json(files);
});

// Route to upload files onto server file system
router.post('/api/upload/', upload.array('package'), (req, res) => {
    if (req.files.length == 0) { res.status(200).redirect('/'); return; } // No files have been uploaded
    if (!req.session.uploaded_files) req.session.uploaded_files = [];

    const p = get_port(), http_s = get_http_or_https();

    req.files.forEach(item => {
        req.session.uploaded_files.push(
            {
                file_name: item.filename,
                file_path: http_s + IPv4 + ':' + p + "/f/" + item.filename,
                original_name: item.originalname
            });
    });

    res.status(200).redirect('/'); return;
});

// Returns the list of files uploaded by the user in the current session
router.get('/api/files/uploaded', async (req, res) => {
    if (req.session.uploaded_files == undefined) {
        res.json({ status: 'warning', description: 'no files have been uploaded' }); return;
    }
    res.json({ uploaded_files: req.session.uploaded_files });
});

module.exports = router;