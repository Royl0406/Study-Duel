import { Crab } from "../Types";
import { calcRemainingTime, MINUTE_TO_MS } from "./utilities.js";

//Checks if the url matches the regex pattern of urls stored in the blocklist
export function isUrlBlocked(inputUrl, blockedList) {
    for (let i = 0; i < blockedList.length; i++) {
        let url = blockedList[i];
        let regExp = convertUrlToRegExp(url)
        console.log("url: " + inputUrl);
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

export async function fetchTotCoins() {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    return crab.coin as number;
}

export async function addToTotCoins(coin) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.coin = crab.coin + coin;
    console.log("storeCoin: " + crab.coin);
    chrome.storage.local.set({ crab });

    return crab.coin;
}

export async function fetchFoodCount() {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    return crab.food
}

export async function updateFoodCount(change: number) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.food = crab.food + change;
    chrome.storage.local.set({ crab });
    return crab.food;
}

export function incrementFoodCount() {
    return updateFoodCount(1);
}

export function decrementFoodCount() {
    return updateFoodCount(-1);
}

export async function storeTotSessions(sessions: number) {
    await chrome.storage.local.set({totSessions: sessions, remainingSessions: sessions});
}

export async function fetchTotSessions() {
    let result = await chrome.storage.local.get(['totSessions']);
    return result.totSessions as number;
}

export async function storeRemainingSessions(newRemainingSessions: number) {
    await chrome.storage.local.set({remainingSessions: newRemainingSessions});
}
export async function fetchRemainingSessions() {
    let result = await chrome.storage.local.get(['remainingSessions']);
    return result.remainingSessions as number;
}

export async function decrementRemainingSessions(): Promise<number> {
    let decrementedRemainingSessions = await fetchRemainingSessions() - 1;
    await storeRemainingSessions(decrementedRemainingSessions);
    return decrementedRemainingSessions;
}

export async function calcRemainingBreakTime(): Promise<number> {
    let startTime = (await chrome.storage.local.get(['breakStartTime'])).breakStartTime as number | null;
    if(startTime === null) return 0;
    let totalBreakMin = 1;
    let totalBreakTimeMs = totalBreakMin * MINUTE_TO_MS;
    return calcRemainingTime(startTime, totalBreakTimeMs);
}




