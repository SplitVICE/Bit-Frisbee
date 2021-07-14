// Create .env file /backend/.env
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4000,
    SHOW_FILES_STORED: process.env.SHOW_FILES_STORED || 'TRUE',
    USE_HTTPS: process.env.USE_HTTPS || 'FALSE',
    DOMAIN: process.env.DOMAIN || 'ipv4'
};