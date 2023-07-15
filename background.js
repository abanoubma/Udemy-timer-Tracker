chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('updated from background');
});