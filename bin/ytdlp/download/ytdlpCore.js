const lcl = require('cli-color'),
    path = require('path'),
    {
        readJSON,
        writeJSON
    } = require('../../readWrite'),
    getDownloadURL = require('./ytdlpGithub'),
    fetchDownload = require('./ytdlpDownload');

// manage download of YTDLP
async function downloadCore() {
    // load version 
    var version = await readJSON(path.join(__dirname, 'version.json'), true);
    if (version.success == false) var version = {
        success: true,
        version: '0.0.0'
    };

    // get latest version from github
    var githubVersion = await getDownloadURL();
    if (githubVersion.success) {
        // compare versions
        if (version.version != githubVersion.versionTag) {
            // attempt download 
            var githubDownload = await fetchDownload(githubVersion.downloadURL, githubVersion.platform);
            if (githubDownload.success) {
                // update version
                version.version = githubVersion.versionTag;

                // save version
                await writeJSON(path.join(__dirname, 'version.json'), version, true);
                console.log(lcl.green('[YTDLP Download - Success]'), `Updated YTDLP version (${version.version})`);
                return {
                    success: true,
                    message: `Updated YTDLP version to ${version.version}`
                };
            } else {
                return {success: false}
            }
        } else {
            console.log(lcl.blue('[YTDLP Download - Info]'), `YTDLP is up to date (${version.version})`);
            return {
                success: true,
                message: 'YTDLP is up to date'
            }
        }
    } else {
        return {success: false}
    }
}

module.exports = downloadCore;