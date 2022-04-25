const lcl = require('cli-color'),
    lang = require('../../lang/loadLangs')('YoutubeDL Download'),
    path = require('path'),
    { exec } = require('child_process'),
    { writeFileSync } = require('fs'),
    release = require('../../github/getReleases'),
    fetch = require('node-fetch');

async function downloadYTDL() {
    // get releases from github
    const releases = await release(process.env.YTDL_REPO || 'https://github.com/yt-dlp/yt-dlp');
    if (releases.success !== true) {
        return { success: false }
    }

    // fetched releases
    console.log(lcl.green(`[${lang.CONSOLE_SERVICE_GITHUB} - ${lang.CONSOLE_GENERIC_SUCCESS}]`), lang.CONSOLE_YTDL_MESSAGE_GOT_RELEASE);

    // get the latest release
    // loop over the releases and return
    let releaseData = {
        windows: {
            success: false,
            url: ""
        },
        unix: {
            success: false,
            url: ""
        }
    }

    // loop over the releases and return win and unix
    for (const release of releases.GH_Release[0].assets) {
        // windows
        if (release.name == "yt-dlp.exe" && release.content_type == "application/vnd.microsoft.portable-executable") {
            if (!releaseData.windows.success) {
                releaseData.windows.success = true;
                releaseData.windows.url = release.browser_download_url;
                console.log(lcl.green(`[${lang.CONSOLE_SERVICE_GITHUB} - ${lang.CONSOLE_GENERIC_SUCCESS}]`), lang.CONSOLE_YTDL_MESSAGE_FOUND_DOWNLOAD);
            }
        }

        // unix
        if (release.name == "yt-dlp" && release.content_type == "application/octet-stream") {
            if (!releaseData.unix.success) {
                releaseData.unix.success = true;
                releaseData.unix.url = release.browser_download_url;
                console.log(lcl.green(`[${lang.CONSOLE_SERVICE_GITHUB} - ${lang.CONSOLE_GENERIC_SUCCESS}]`), lang.CONSOLE_YTDL_MESSAGE_FOUND_DOWNLOAD);
            }
        }
    }

    // switch for unix or windows
    switch (process.platform) {
        case "win32":
            if (releaseData.windows.success) {
                // fetch download and save into yt-dl folder 
                try {
                    const response = await fetch(releaseData.windows.url);
                    const data = await response.buffer();
                    await writeFileSync(path.join(__dirname, "../", "bin", "yt-dl.exe"), data);
                    console.log(lcl.green(`[${lang.CONSOLE_SERVICE_GITHUB} - ${lang.CONSOLE_GENERIC_SUCCESS}]`), lang.CONSOLE_YTDL_MESSAGE_DOWNLOAD_SUCCESS);
                    return { success: true };
                } catch (err) {
                    console.log(lcl.red(`[${lang.CONSOLE_SERVICE_YOUTUBEDL} - ${lang.CONSOLE_GENERIC_ERROR}]`), lang.CONSOLE_YTDL_DOWNLOAD_ERROR, `\n${lcl.red(`[${lang.CONSOLE_SERVICE_YOUTUBEDL} - ${lang.CONSOLE_GENERIC_ERROR}]`)} ${err.message}`);
                    return { success: false, message: lang.CONSOLE_YTDL_DOWNLOAD_ERROR };
                }
            } else {
                return { success: false, message: lang.CONSOLE_YTDL_DOWNLOAD_WIN_MISSING };
            }
        case "linux":
        case "darwin":
            if (releaseData.unix.success) {
                // same as windows but chmod +x yt-dl bin
                try {
                    const response = await fetch(releaseData.unix.url);
                    const data = await response.buffer();
                    await writeFileSync(path.join(__dirname, "../", "bin", "yt-dl"), data);
                    await exec(`chmod +x ${path.join(__dirname, '../', 'bin', 'yt-dl')}`);
                    console.log(lcl.green(`[${lang.CONSOLE_SERVICE_GITHUB} - ${lang.CONSOLE_GENERIC_SUCCESS}]`), lang.CONSOLE_YTDL_MESSAGE_DOWNLOAD_SUCCESS);
                    return { success: true };
                } catch (err) {
                    console.log(lcl.red(`[${lang.CONSOLE_SERVICE_YOUTUBEDL} - ${lang.CONSOLE_GENERIC_ERROR}]`), lang.CONSOLE_YTDL_DOWNLOAD_ERROR, `\n${lcl.red(`[${lang.CONSOLE_SERVICE_YOUTUBEDL} - ${lang.CONSOLE_GENERIC_ERROR}]`)} ${err.message}`);
                    return { success: false, message: lang.CONSOLE_YTDL_DOWNLOAD_ERROR };
                }
            } else {
                return { success: false, message: lang.CONSOLE_YTDL_DOWNLOAD_UNIX_MISSING };
            }
        default:
            return { success: false, message: lang.CONSOLE_YTDL_DOWNLOAD_MISSING_PLATFORM };
    }
}

async function main() {
    await downloadYTDL();
}

main();
module.exports = downloadYTDL;