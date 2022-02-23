const assert = require('assert');
const tasks = require('../lib/tasks');
const axios = require('axios');
const ENV = require('../config/env');
const URL = `http://localhost:${ENV.PORT}`;

describe("Lib testing", () => {
    it('UUID', () => {
        const res36 = tasks.GetUUID();
        const res10 = tasks.GetUUID({ length: 10 });
        assert(res36.length == 36 && res10.length == 10)
    })
});

describe("Route testing", () => {
    it('/api/ping', async () => {
        const { data: res } = await axios(`${URL}/api/ping`);
        assert(res.status == 'up' && res.description == 'server is up and running');
    })
    it('/api/ping', async () => {
        const { data: res } = await axios(`${URL}/api/ping`);
        assert(res.status == 'up' && res.description == 'server is up and running');
    })
});
