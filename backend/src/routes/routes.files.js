// ========================================================================================
// CONSTANTS & REQUIREMENTS
// ========================================================================================
const express = require('express');
const router = express.Router();
const env = require('../config/env');
const constants = require('../config/constants');
const fs = require('fs');
const multer = require('multer');
const { nanoid } = require('nanoid');
const fileExtension = require('file-extension');
const localIpV4Address = require('local-ipv4-address');
const file_storage_folder = constants.file_storage_folder;

// ========================================================================================
// MULTER SETTINGS
// ========================================================================================

// Multer storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, file_storage_folder); },
    filename: function (req, file, cb) {
        const file_name = nanoid(7) + '.' + fileExtension(file.originalname); cb(null, file_name);
    }
});

// Multer middleware set
const upload = multer({ storage: storage });

// ========================================================================================
// HELPER FUNCTIONS AND SETTINGS
// ========================================================================================

let IPv4 = undefined;
(async () => { IPv4 = await localIpV4Address(); })();
const CUSTOM_DOMAIN = (() => { return env.DOMAIN.toLowerCase() == 'ipv4' ? false : env.DOMAIN; })();

function get_port() {
    if (env.PORT == '80') return ''; // returns nothing if port is 80
    else return env.PORT;
}

function get_http_or_https() {
    if (env.USE_HTTPS.toLowerCase() == 'true') return 'https://';
    else return 'http://';
}

// ========================================================================================
// ROUTER FUNCTIONS
// ========================================================================================

// Sends the access links of all files stored
router.get('/api/files/', async (req, res) => {
    if (env.SHOW_FILES_STORED.toLowerCase() != 'true') {
        res.status(200).json({ status: 'failed', description: 'files readability disabled' }); return;
    }
    const file_names = fs.readdirSync(file_storage_folder), files = [], p = get_port(), http_s = get_http_or_https();
    file_names.forEach(item => {
        files.push(
            {
                file_name: item,
                file_path: (() => {
                    if (!CUSTOM_DOMAIN)
                        return http_s + IPv4 + ':' + p + '/f/' + item;
                    else return http_s + CUSTOM_DOMAIN + '/f/' + item;
                })()
            });
    });

    res.status(200).json(files);
});

// Route to upload files onto server file system
router.post('/api/upload/', upload.array('package'), (req, res) => {
    if (req.files.length == 0) { res.json({ status: 'failed', description: 'no files uploaded' }); return; }

    const p = get_port(), http_s = get_http_or_https();
    const files = [];

    req.files.forEach(item => {
        files.push(
            {
                file_name: item.filename,
                file_path: (() => {
                    if (!CUSTOM_DOMAIN)
                        return http_s + IPv4 + ':' + p + '/f/' + item.filename;
                    else return http_s + CUSTOM_DOMAIN + '/f/' + item.filename;
                })(),
                original_name: item.originalname
            });
    });
    res.json({ status: 'success', description: 'files uploaded', files: files });
});

// Route to upload files onto server file system from an external source
router.post('/api/upload-external/', upload.array('files'), (req, res) => {
    if (req.files === undefined) { res.status(200).json({ status: 'warning', description: 'no files provided' }); return; }
    if (req.files.length == 0) { res.status(200).json({ status: 'warning', description: 'no files provided' }); return; }

    const p = get_port(), http_s = get_http_or_https();

    const FILES = []; req.files.forEach(e => {
        FILES.push({
            file_name: e.filename,
            file_path: (() => {
                if (!CUSTOM_DOMAIN) return http_s + IPv4 + ':' + p + '/f/' + e.filename;
                else return http_s + CUSTOM_DOMAIN + '/f/' + e.filename;
            })(),
            original_name: e.originalname
        });
    });
    res.status(200).json({ status: 'success', description: 'files uploaded', files: FILES });
});

module.exports = router;