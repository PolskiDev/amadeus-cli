const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration)

async function runCompletion(input) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        prompt: `${input}`
    })
    console.log(completion.data.choices[0].text+`\n\n`)
}


let input = process.argv.slice(2)[0]
runCompletion(input);