import { Crab } from "../Types";

//Checks if the url matches the regex pattern of urls stored in the blocklist
export function isUrlBlocked(inputUrl, blockedList) {
    for (let i = 0; i < blockedList.length; i++) {
        let url = blockedList[i];
        let regExp = convertUrlToRegExp(url)
        console.log("url: " + url);
        if (regExp.test(inputUrl)) {
            console.log("website found in block list");
            return true;
        }
    }
    return false;
}

export function removePrefixFromUrl(url) {
    const protocalLength = 3;
    let protocalindex = url.indexOf("://") + 3;
    return url.substr(protocalindex);
}

export function convertUrlToRegExp(url) {
    let urlSubstring = removePrefixFromUrl(url);
    let regExpPrefix = "https?://([a-z0-9]+[.])*";
    let regExpSuffix = "(/.*)?";
    let regExp = regExpPrefix + urlSubstring + regExpSuffix;

    return new RegExp(regExp);
}

export async function fetchLevel() {
    let { crab } = await chrome.storage.local.get(['crab']);
    return crab.level;
}

export async function fetchFocusTime() {
    let result = await chrome.storage.local.get(['TOTAL_TIME_MS', 'totalDistractedTime']);
    let focusedTime = result.TOTAL_TIME_MS - result.totalDistractedTime;
    return focusedTime;
}

export async function fetchXp() {
    let result = await chrome.storage.local.get(['crab']);
    let crab =  result.crab as Crab;
    return crab.xp;
}

export async function fetchName() {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    return crab.name as String;
}



