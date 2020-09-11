const fs = require('fs-extra');
var path = require('path');


// Sync:
try {
    fs.emptyDirSync(path.join(__dirname, "build"))
    fs.copySync(path.join(__dirname, "src/config/global.config.json"),path.join(__dirname,"build/config/global.config.json"))
    console.log('Old dir clean and global.config.json was copied successfully.');
} catch (err) {
    console.error(err)
}

