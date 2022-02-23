// ========================================================================================
// CONSTANTS & REQUIREMENTS.
// ========================================================================================
const express = require('express');
const router = express.Router();
const ENV = require('../config/env');
const CONSTANTS = require('../config/constants');
const tasks = require('../lib/tasks');
const fs = require('fs');
const multer = require('multer');
const fileExtension = require('file-extension');

// ========================================================================================
// MULTER SETTINGS.
// ========================================================================================

// Multer initialization.
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => { cb(null, CONSTANTS.FILE_STORAGE_FOLDER); },
        filename: (req, file, cb) => {
            const file_name = (() => {
                // Gets the name without file extension.
                const fileName = "" + file.originalname.replace(`.${fileExtension(file.originalname)}`, "");
                return `${fileName}-${tasks.GetUUID({ length: 11 })}.${fileExtension(file.originalname)}`;
            })();
            cb(null, file_name);
        }
    })
});

// ========================================================================================
// ROUTER FUNCTIONS.
// ========================================================================================

// Sends the access links of all files stored.
router.get('/api/files/', async (req, res) => {
    if (ENV.SHOW_FILES_STORED === false) {
        res.status(200).json({ status: 'failed', description: 'files readability disabled' }); return;
    }
    const fileNames = fs.readdirSync(CONSTANTS.FILE_STORAGE_FOLDER), files = [];
    const DOMAIN = await ENV.DOMAIN;
    for (const item of fileNames) {
        files.push({
            file_name: item,
            file_path: `${ENV.USE_HTTPS}${DOMAIN}/${item}`,
        });
    }
    res.status(200).json(files);
});

// Route to upload files onto server file system from the same application..
router.post('/api/upload/', upload.array('files'), (req, res) => {
    uploadApi(req, res);
});

// Route to upload files onto server file system from an external source.
router.post('/api/upload-external/', upload.array('files'), (req, res) => {
    uploadApi(req, res);
});

const uploadApi = async (req, res) => {
    if (req.files === undefined || req.files.length == 0) { res.status(200).json({ status: 'failed', description: 'no files provided' }); return; }

    const DOMAIN = await ENV.DOMAIN, files = [];
    for (const item of req.files) {
        files.push(
            {
                file_name: item.filename,
                file_path: `${ENV.USE_HTTPS}${DOMAIN}/${item.filename}`,
                original_name: item.originalname,
                mime_type: item.mimetype,
                size: item.size
            });
    }
    res.json({ status: 'success', description: 'files uploaded', files });
}

module.exports = router;
