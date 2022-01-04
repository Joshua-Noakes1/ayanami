const lcl = require('cli-color'),
    {
        spawn
    } = require('child_process');

async function webpToGIF(webpPath, webpUUID, gifPath) {
    try {
        await spawn('magick', [webpPath, gifPath]);
        console.log(lcl.green("[WebpToGIF - Success]"), `Converted webp ("${webpUUID}.webp") to gif`);
        return {
            path: gifPath,
            success: true
        }
    } catch (err) {
        console.log(lcl.red("[WebpToGIF - Error]"), "Failed to convert webp to gif", err);
        return {
            success: false
        }
    }
}

module.exports = webpToGIF;