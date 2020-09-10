const fs = require('fs-extra');
var path = require('path');

// Sync:
try {
    fs.emptyDirSync(path.join(__dirname, "server/public"))
    fs.copySync(path.join(__dirname, "build"),path.join(__dirname, "server/public"))
    console.log('react build copied to server/public.')
} catch (err) {
    console.error(err)
}