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
    })()
}
