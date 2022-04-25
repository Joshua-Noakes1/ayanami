require('dotenv').config();
const lcl = require('cli-color'),
    path = require('path'),
    loadLang = process.env.lang.toString().split("_")[0].toLowerCase();

function loadLangs(filename) {
    // dev logging
    if (process.env.DEV_MODE == "true") console.log(lcl.yellow("[Lang - Info]"), `Loading Languages for "${filename || "Unknown"}"...`);

    // load languages and return 
    try {
        var lang = require(path.join(__dirname, 'langs', `${loadLang}.json`));
    } catch (err) {
        console.log(lcl.red("[Lang - Error]"), `Failed to load language file "${loadLang}"`, `\n${lcl.red("[Lang - Error]")} ${err.message}`);
        return process.exit(1);
    }
    if (!lang.success) {
        console.log(lcl.red("[Lang - Error]"), `Failed to load language file "${loadLang}"`);
        return process.exit(1);
    }

    if (process.env.DEV_MODE == "true") console.log(lcl.green("[Lang - Info]"), `Loaded Languages for "${filename || "Unknown"}"`);
    return lang;
}

module.exports = loadLangs;