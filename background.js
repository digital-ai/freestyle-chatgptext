


function getAlert() { alert("Oh snap"); }


async function GetCurrentTabID() {

    //set options for current/active tab, and retrieve it via extension API
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      func : getAlert,
    })
    .then(() => console.log("injected a function"));

}


GetCurrentTabID();


