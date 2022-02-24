const assert = require('assert');
const filesize = require('filesize');

describe("File size testing", () => {
    it("Test", () => {
        console.log(filesize(1024, {base: 2}));
    })
});
