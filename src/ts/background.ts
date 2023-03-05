import { Message } from "./types";

export {};

let ws: WebSocket | null = null;;

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    console.log(message.enabled);

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
        console.log('Connected');
        chrome.runtime.sendMessage({enabled: true, status: 'Connected'});
    }
    
    ws.onmessage = (data) => {
        chrome.tabs.reload();
    }
    
    ws.onclose = (data) => {
        chrome.runtime.sendMessage({enabled: false, status: 'Disconnected'});
    }

    ws.onerror = (event) => {
        console.log(event);
        chrome.runtime.sendMessage({enabled: false, status: 'Unable to connect to warb'});
    }
}