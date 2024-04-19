document.addEventListener("DOMContentLoaded", () => {
  // GET THE SELECTORS OF BUTTON
  const startVideoButton = document.querySelector(".start_video");
  const stopVideoButton = document.querySelector(".stop_video");

  
  //add event listener
  startVideoButton.addEventListener("click", async () => {
    //query for the currently-active tab or window
    await chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "request_recording" },
          // callback(optional) for logging whether the extension UI is connected
          //to the current tab
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
                console.log(response)
              console.log(chrome.runtime.lastError);
            }
          }
        );
      }
    );
  });
//   Everything is same except action
  stopVideoButton.addEventListener("click", async () => {
    //query for the currently-active tab or window
    await chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "stop_recording" },
          // callback(optional) for logging whether the extension UI is connected
          //to the current tab
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
              console.log(response);
              console.log(chrome.runtime.lastError);
            }
          }
        );
      }
    );
  });
});
