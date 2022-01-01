# accore

## Introduction

What is accore?   
accore is a Discord bot built to fetch all versions (watermarked and un-watermarked) of a TikTok video. It also grabs metrics from the video such as like count, comment count and much more.

https://user-images.githubusercontent.com/53623449/147841172-4e9eedd1-6682-4ad4-8515-241e9d27d1c0.mp4

## Usage

accore uses Discord's slash command system to let the download TikTok videos.
| Command | Descripton | Usage |
|--------------|-----------|------------|
| /video | Gets a single video from TikTok | /video url:https://vm.tiktok.com/ZM8K5XLfV # url:To TikTok video |
| /account | Gets all videos from an account on TikTok | /account url:https://tiktok.com/@jokeryoda oldest:True # url:To TikTok account oldest:True to download oldest videos first |

## Install
### Enviroment Variables
| Variable | Descripton | Default | Optional |
|--------------|-----------|------------|------------|
| TOKEN | Your Discord bot token | <TOKEN> | ❌ |
| REPO | The Github repo to download YT-DLP from | yt-dlp/yt-dlp | ✔ |
| UPDATE | Weather or not to update YT-DLP | true | ✔ |

### Shell
1. Git clone ```https://github.com/Joshua-Noakes1/accore.git```
2. Add your enviroment variables into a .env file
3. Run ```npm install```
4. Run ```npm run start```
