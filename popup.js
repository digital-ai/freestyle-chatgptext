const tagListId = "agility-tag-ext-tags";
const explanationId = "agility-tag-ext-explanation"
const tagfetchButtonId = "agility-tag-ext-analyze"

function setExplanationText() {
    // Session storage has been chosen instead of local storage
    // because we do NOT want to share information between tabs
    let storyData = sessionStorage.getItem("StoryData");

    console.log(storyData);

    if (storyData)
    {
        let elem = document.getElementById(explanationId);

        elem.innerText = `This extension will suggest tags based on the title and the description of the current story. 
                Please click the button below to receive tag suggestions.`
        elem.setAttribute("style", "")
    }
    else {
        let elem = document.getElementById(explanationId);
        elem.innerText = `No story found.`
        elem.setAttribute("style", "color:red")
    }
}

function onTagGeneration() 
{
    let button = document.getElementById(tagfetchButtonId);
    let tagList = document.getElementById(tagListId);
    
    button.innerText = "Analyzing..."
    tagList.innerHTML = "";
        
    getSuggestions(sessionStorage.getItem("StoryData")).then((data) => {
        button.innerText = "Suggest Tags";
        onTagGenerationComplete(data);
    });
      
}

function handleTagGeneration() {
    let button = document.getElementById(tagfetchButtonId);
    button.addEventListener('click', onTagGeneration);
}

// TODO: change to actual data
function onTagGenerationComplete(results)
{
    console.log(results);
    let tagList = document.getElementById(tagListId);
    results.forEach(result => {
        let tag = document.createElement("li")
        tag.innerText = result;
        tagList.appendChild(tag);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('sessionEvent', (event) => { setExplanationText(); });
    handleTagGeneration();
});