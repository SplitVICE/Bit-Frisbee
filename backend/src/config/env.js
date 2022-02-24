// Create .env file /backend/.env
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    SHOW_FILES_STORED: (() =>
        process.env.SHOW_FILES_STORED && process.env.SHOW_FILES_STORED.toLowerCase() == 'true'
            ? true : false
    )(),
    USE_HTTPS: (() => process.env.USE_HTTPS && process.env.USE_HTTPS == 'true' ? "https://" : "http://")(),
    DOMAIN: (async () => {
        if (process.env.DOMAIN) return process.env.DOMAIN;

        const localIpV4Address = require('local-ipv4-address');
        return `${await localIpV4Address()}:${process.env.PORT || 4000}`
    })(),
    // https://convertlive.com/u/convert/bytes/to/megabytes
    FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT || 157286400, // Expressed in Bytes. => 150MB.
    DEV_MODE: process.env.DEV_MODE && process.env.DEV_MODE === 'true' ? true : false
}
