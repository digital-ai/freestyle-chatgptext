const tagListId = "agility-tag-ext-tags";
const explanationId = "agility-tag-ext-explanation"
const tagfetchButtonId = "agility-tag-ext-analyze"

function setExplanationText() {
    // Session storage has been chosen instead of local storage
    // because we do NOT want to share information between tabs
    let storyData = undefined //sessionStorage.getItem("story");

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
        
    // Make call to tag suggestion code here
    setTimeout(() => {
        button.innerText = "Suggest Tags"
      }, "1000")
    
      // TODO: change to actual data
      onTagGenerationComplete(["tag1", "tag2", "tag3"]);
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
    setExplanationText();
    handleTagGeneration();
});