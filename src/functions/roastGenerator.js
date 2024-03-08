
require('dotenv').config(); // Ensure that this line is at the top of your file to use environment variables
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.openapi_key,
});

async function generateRoast() {
    try {
        const prompt = "Generate a funny roast. It can be a bit raunchy too. In fact, the more embarassing, the better";

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
          });

        return chatCompletion.choices[0].message.content

    } catch (error) {
        console.error('Error generating roast:', error);
    }
}
module.exports = generateRoast;

