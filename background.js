
//Pack description and Title into object and return it.
function ScrapeCurrentDOM() {
    
    

    return {Title: "DemoTitle", Description: "Demo Description"};
}


async function GetAccessToCurrentDOM() {

    //set options for current/active tab, and retrieve it via extension API
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    if(!tab) { return undefined; }
    if (tab.url?.startsWith("chrome://")) {return undefined;}
    //Part 2 validate if page is agility prior to scraping with tabs.URL?
    //TODO 

    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      func : ScrapeCurrentDOM,
    })
    .then((data) => console.log(data[0].result))

}

GetAccessToCurrentDOM();







