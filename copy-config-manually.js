const fs = require('fs');
var path = require('path');

// console.log(path.join(__dirname, "./src/config/config.json"))
// console.log(path.resolve(__dirname, "./src/config/config.json"))

// destination.txt will be created or overwritten by default.
fs.copyFileSync(path.join(__dirname, "src/global.config.json"),path.join(__dirname, "server/src/config/global.config.json"));
fs.copyFileSync(path.join(__dirname, "src/global.config.ts"),path.join(__dirname, "server/src/config/global.config.ts"));
console.log('global.config.ts &  global.config.json was copied successfully.');
