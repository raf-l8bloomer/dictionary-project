/* Your app should take a word as a commandline argument, 
request that word's definition from Merriam Webster,
and print the definition to the console
*/

const https = require('https');

// function printDef(word, definition) {
//     const message = `${word}: ${definition}`;
//     console.log(message)
// }


//Connect to the API URL

function getDefinition(word){
    try {
    // Request the data
    const request = https.get(
        `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=db601897-42ca-4fb3-932d-0c0542a0e89e`,
        (response) => {
            // Read the data
            let body = ""
            response.on('data' , data => {
                body += data.toString();
            });
            // Parse the data
            response.on('end', () => {
                let definition = JSON.parse(body);
                // Print the data
                console.log(definition[0].shortdef);
            });
        }
    ); 
    request.on('error', (error) => console.error(error.message));
    } catch(error) {
        console.error(error.message);
    }
}

const query =process.argv.slice(2);
query.forEach(getDefinition);


