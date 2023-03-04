chrome.storage.session.get(["enabled"]).then((result => {
    document.getElementById('enabled').checked = result.enabled;
}));

document.getElementById('enabled').addEventListener('change', (event) => {
    chrome.storage.session.set({enabled: event.currentTarget.checked});
})