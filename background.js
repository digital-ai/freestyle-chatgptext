
//Pack description and Title into object and return it.
function ScrapeCurrentDOM() {

    let description = document.querySelector('[id*=".Description-"]');

    let title = document.querySelector('[id="asset-title-mount"] textarea').textContent;

    if (description === null) {return undefined}
   
    let descriptionText = description.innerText;


    return {Title: title, Description: descriptionText};
}


async function GetAccessToCurrentDOM() {

    //set options for current/active tab, and retrieve it via extension API
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    if(!tab) { return undefined; }

    if (tab.url?.startsWith("chrome://")) {return undefined;}

    let isValidAgility = false;

    if (tab.url?.startsWith("chrome://")) {return undefined;}


    console.log(isValidAgility);
    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      func : ScrapeCurrentDOM,
    }).then((data) => sessionStorage.setItem("StoryData", JSON.stringify(data[0].result)));

}

GetAccessToCurrentDOM();







