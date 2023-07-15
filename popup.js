
window.onload = function () {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
      UpdteTime(count);
    });
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getPause" }, function (Pval) {
      if (Pval) {
        document.getElementById("pauseCheckBox").checked = true;

      }
      else {
        document.getElementById("pauseCheckBox").checked = false;
      }
    });

  });

  $('#btnReset').click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "resetCount" }, function (count) {        
          UpdteTime(count - 1);        
      });
    });
  });



  const checkbox = $("#pauseCheckBox");
  checkbox.click(function (event) {
    var checkbox = event.target;
    if (checkbox.checked) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "pause", check: true }, function (count) {
          UpdteTime(count);
        });
      });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "pause", check: false }, function (count) {
          UpdteTime(count);
        });
      });
    }
  });
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}
function UpdteTime(message) {
  var sec = isNaN(message) ? -1 : message;
  document.getElementById("seconds").innerHTML = pad(++sec % 60);
  document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10) % 60);
  document.getElementById("hours").innerHTML = pad(parseInt(sec / 60 /60, 10));
}
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    switch (message.type) {
      case "setCount":
        console.log(message.Val);
        UpdteTime(message.Val);
        break;
      default:
        console.error("Unrecognised message: ", message);
    }
  }
);


