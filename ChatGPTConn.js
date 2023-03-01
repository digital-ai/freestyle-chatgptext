//create request object from screen data
function getRequestBody(data){
    let jsonData = JSON.parse(data);
    let prompt = 'Generate a list of five searchable tags for a agile workflow story or defect based on the following title and description. Return results as a json formatted array of strings.';
        prompt += '\nTitle = ' + jsonData.Title;
        prompt += '\nDescription = ' + jsonData.Description;

    return {
        'model':'text-davinci-003',
        'prompt':prompt,
        'logit_bias': getBiasMap().entries(),
        'max_tokens':64
    };
}

function getBiasMap(){
    let tagBias = new Map();
    tagBias.add(13571, -100);
    tagBias.add(11855, -100);
    tagBias.add(36710, -100);
    tagBias.add(30798, -100);
    tagBias.add(1621, -100);
    tagBias.add(30798, -100);
    tagBias.add(11605, -100);
    tagBias.add(8362, -100);
    tagBias.add(1058, -100);
    tagBias.add(25, -100);
    tagBias.add(90, -100);
    tagBias.add(92, -100);
    tagBias.add(1391, -100);
    tagBias.add(1298, -100);
    tagBias.add(11097, -100);
    return tagBias;
}

Object.defineProperty(Map.prototype, "add", {
    value: function add(key, value){
        this.set(key, value);
    }
});

// create header for request with organization and auth token
function getRequestHeader() {
     return {
        'Content-Type':'application/json',
        'Authorization':'[Bearer AccessTokenHere]', //this is very very bad, never ever do this
        'OpenAI-Organization':'org-2ev8gvyzVZ13Z7XzTs76lGvQ'
    };
}

//Get Completion
async function getSuggestions(story) {
    let requestBody = getRequestBody(story)
    let request = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: getRequestHeader(),
        body: JSON.stringify(requestBody)
    });
    let response = await request.json();
    try {
        let returnValue = JSON.parse(response["choices"][0]["text"]);
        return returnValue;
    }catch{
        let tags = response["choices"][0]["text"].replace(/[\[\]]/g,"").trim().split(",");
        return tags;
    }
}