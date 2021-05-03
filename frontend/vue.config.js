const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../backend/src/public"),
  assetsDir: "spa",
}

console.log(path.join(__dirname, "../backend/src/public/"));

// npm run build --no-clean
// https://cli.vuejs.org/config/#publicpath