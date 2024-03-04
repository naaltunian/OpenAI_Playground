import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: process.env.GPT_MODEL,
  });

  console.log(chatCompletion.choices)
}

main();