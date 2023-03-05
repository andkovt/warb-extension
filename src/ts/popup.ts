import '../scss/style.scss'
import {Message} from './types';

export {};

const enabledSwitch = document.getElementById('enabled-switch') as HTMLInputElement;
const statusText = document.getElementById('status');

const storage = await chrome.storage.session.get(['enabled', 'status']);

if (storage.enabled && enabledSwitch !== null) {
    enabledSwitch.checked = true;
}

if (storage.status && statusText !== null) {
    statusText.innerText = storage.status;
}

if (enabledSwitch !== null) {
    enabledSwitch.addEventListener('change', async (event) => {
        const target = event.currentTarget as HTMLInputElement;
        await chrome.storage.session.set({enabled: target.checked});

        chrome.runtime.sendMessage({enabled: target.checked});
    });
}

chrome.runtime.onMessage.addListener((message : Message, sender, sendResponse) => {
    if (statusText !== null) {
        statusText.innerText = message.status;
    }

    if (enabledSwitch !== null) {
        enabledSwitch.checked = message.enabled;
    }

    chrome.storage.session.set({enabled: message.enabled, status: message.status});
});