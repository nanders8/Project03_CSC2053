//this is basically a handler for the extension that runs persistently.
chrome.runtime.onMessage.addListener( //wait for a message from popup.js that tells it the chrome extension button has been click
    function(message, sender, sendResponse) {
      console.log(`${message} in background`) //diagnostic stuff
      sendResponse(`${message} from background`)
      
        const e = Math.round((window.screen.availHeight - 710) / 2), t = Math.round((window.screen.availWidth - 800) / 2);
        chrome.windows.create({ //open a window with a source to "index.html", which is basically "screencapblob.html" with the <script> sections in a different js file
            url: chrome.extension.getURL("index.html"),
            width: 800,
            height: 710,
            top: e,
            left: t,
            type: "popup"
        })

      return true
    }
)
