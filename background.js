console.log("Successsfully loading the background.js");

//chrome is object

//onUpdated() is detecting when the tab becomes fully loaded like the google.com is
//fully loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    //injecting the content script in that current tab with tabId
    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ["./contentScript.js"],
      })
      .then(() => {
        console.log("Successfully injected the content script");
      })
      .catch((err) => console.log(err, "Error while injected content script"));
  }
});

// For message between parts of extension use chrome.runtime
