import "dotenv/config.js";
import { generateImageFromPrompt } from './service/image.js'

async function main() {
    generateImageFromPrompt('bass guitar')
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: process.env.GPT_MODEL,
//   });

//   console.log(chatCompletion.choices)

// const response = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: "rickenbacker bass guitar",
//     n: 1,
//     size: "1024x1024",
//   });

//   console.log(response)
}

main();