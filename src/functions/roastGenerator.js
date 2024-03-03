const axios = require('axios');
require('dotenv').config();
const OpenAI = require('openai');
const client = new OpenAI({apiKey: process.env.openapi_key});

async function generateRoast() {
  try {
      // Specify the prompt for generating the roast
      const prompt = "Generate a funny roast. It can be a bit raunchy too.";

      // Set parameters for the chat
      const params = {
          model: "gpt-3.5-turbo",
          messages: [
              { role: "user", content: prompt },
              { role: "assistant", content: "Generate a roast." }
          ],
          max_tokens: 50,
          temperature: 0.7
      };

      // Call the OpenAI API to generate chat response
      const response = await client.complete(params);

      console.log('API Response:', response.data); // Log the response data

      // Extract the generated text from the response
      // const roast = response.data.choices[0].message.content.trim();
      const roast = response.data

      return roast;
  } catch (error) {
      console.error('Error generating roast:', error);
      return 'Oops! Something went wrong.';
  }
}

module.exports = generateRoast;
