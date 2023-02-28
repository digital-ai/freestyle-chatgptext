//Part 1 get dom access of current tab
function ScrapeCurrentDOM() {



}


async function GetAccessToCurrentDOM() {

    //set options for current/active tab, and retrieve it via extension API
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    if(!tab) { return undefined; }
    if (tab.url?.startsWith("chrome://")) {return undefined;}
    //Part 2 validate if page is agility prior to scraping?
    //TODO 

    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      func : ScrapeCurrentDOM,
    })
    .then(() => console.log("injected a function"));

}

GetAccessToCurrentDOM();

//part 3 prep Description and Title for sending to API





