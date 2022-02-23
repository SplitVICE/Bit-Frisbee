const tasks = {};

/**
 * Returns UUID string with configurable options.
 * @param {Objects} options older of options.
 * @property {Number} options.length required length of the generated UUID.
 * @returns {String} UUID generated string.
 */
tasks.GetUUID = options => {
    const { v4: uuid } = require('uuid');
    return options != undefined && options.length != undefined && !isNaN(options.length)
        ? uuid().slice(0, options.length)
        : uuid();
};

module.exports = tasks;
