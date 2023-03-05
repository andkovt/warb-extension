import { Message } from "./types";

export {};

let ws: WebSocket | null = null;;

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (message.enabled) {
        openAndWatch();
    } else {
        close();
    }
});

function close(): void {
    if (ws !== null) {
        ws.close();
        ws = null;
    }
}

function openAndWatch(): void {
    close();

    ws = new WebSocket("ws://127.0.0.1:9797/watch");

    ws.onopen = () => {
        sendStatusMessage(true, 'Connected');
    }
    
    ws.onmessage = (data) => {
        chrome.tabs.reload();
    }
    
    ws.onclose = (data) => {
        sendStatusMessage(false, 'Disconnected');
    }

    ws.onerror = (event) => {
        sendStatusMessage(false, 'Unable to connect to warb');
    }
}

function sendStatusMessage(enabled: boolean, status: string): void {
    chrome.runtime.sendMessage({enabled: enabled, status: status});
}