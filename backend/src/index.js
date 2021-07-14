/* eslint-disable no-console */
const app = require('./server');
const env = require('./config/env');
const localIpV4Address = require('local-ipv4-address');

app.listen(app.get('port'), async () => {
    if (env.DOMAIN.toLowerCase() == 'ipv4') { // Using IPv4 domain
        console.log(`Bit Frisbee running on ${await localIpV4Address()}:${app.get('port')}`);
    } else {// Using custom domain
        const http_s = (() => {
            return env.USE_HTTPS.toLowerCase() == 'true' ? 'https://' : 'http://';
        })();
        console.log(`Bit Frisbee running on ${http_s}${env.DOMAIN}`);
    }
});