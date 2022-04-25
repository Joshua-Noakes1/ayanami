// get github releases for a repo

const lcl = require('cli-color'),
    langs = require('../lang/loadLangs')('Github Releases'),
    urlParse = require('url-parse'),
    fetch = require('node-fetch');

async function getReleases(repo) {
    // check if repo url is valid
    if (repo.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/]+/gm) == null) {
        console.log(lcl.red(`[${langs.CONSOLE_SERVICE_GITHUB} - ${langs.CONSOLE_GENERIC_ERROR}]`), langs.CONSOLE_TIKTOK_MESSAGE_INVALID_URL);
        return { success: false };
    }

    // parse repo url
    const parsedURL = new urlParse(repo);

    // try and get releases from github and catch errors
    try {
        var GH_Release = await fetch(`https://api.github.com/repos${parsedURL.pathname}/releases`);
        GH_Release = await GH_Release.json();
    } catch (err) {
        console.log(lcl.red(`[${langs.CONSOLE_SERVICE_GITHUB} - ${langs.CONSOLE_GENERIC_ERROR}]`), langs.CONSOLE_GITHUB_MESSAGE_INVALID_REPO, `\n${lcl.red(`[${langs.CONSOLE_SERVICE_GITHUB} - ${langs.CONSOLE_GENERIC_ERROR}]`)} ${err.message}`);
        return { success: false };
    }

    if (GH_Release.message != undefined || GH_Release.length <= 0) {
        console.log(lcl.red(`[${langs.CONSOLE_SERVICE_GITHUB} - ${langs.CONSOLE_GENERIC_ERROR}]`), langs.CONSOLE_GITHUB_MESSAGE_INVALID_REPO);
        return { success: false };
    }

    // return release
    return { success: true, GH_Release };
}

module.exports = getReleases;