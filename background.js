
//determine if current tab is agility story TODO



//grab current DOM
async function getCurrentTabDom() {
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    console.log(tab);
}

getCurrentTabDom();
//Store title and description to export later