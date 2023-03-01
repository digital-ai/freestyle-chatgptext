//create request object from screen data
function getRequestBody(data){
    let prompt = 'Generate a list of five searchable tags for a agile workflow story or defect based on the following title and description. Return results as a json formatted array of strings.';
        prompt += '\nTitle = ' + data.Title;
        prompt += '\nDescription = ' + data.Description;
    return {
        'model':'text-davinci-003',
        'prompt':prompt,
        'max_tokens':64
    };
}

// create header for request with organization and auth token
function getRequestHeader() {
     return {
        'Content-Type':'application/json',
        'Authorization':'', //this is very very bad, never ever do this
        'OpenAI-Organization':'org-2ev8gvyzVZ13Z7XzTs76lGvQ'
    };
}

//Get Completion
async function getSuggestions(story) {
    let request = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: getRequestHeader(),
        body: JSON.stringify(getRequestBody(story))
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

async function testButtonOnClick() {
    let story = {
        Title: 'This is a test',
        Description: 'we are testing if this will actually work to call the api and get a result'
    }
    let result = await getSuggestions(story);
    console.log(result);
}