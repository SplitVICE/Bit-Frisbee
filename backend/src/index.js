/* eslint-disable no-console */
const app = require('./server');
const ENV = require('./config/env');

app.listen(app.get('port'), async () => {
    console.log(`Bit Frisbee running on ${ENV.USE_HTTPS}${await ENV.DOMAIN}`);
});
