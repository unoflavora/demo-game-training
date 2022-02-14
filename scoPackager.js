const scopackager = require('simple-scorm-packager');
const path = require('path');
const fs = require('fs');

fs.readFile(
    path.resolve(__dirname, './config/scorm.config.json'),
    (err, data) => {
            let config = JSON.parse(data.toString('utf8'));

            scopackager(config, function(msg){
                console.log(msg);
                process.exit(0);
            });
    }
)
