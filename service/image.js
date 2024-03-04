import OpenAI from 'openai';
import readlineSync from 'readline-sync'
import Axios from 'axios'
import fs from 'fs'

async function generateImageFromPrompt() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = readlineSync.question('Provide an image description ')

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
    });

    console.log(response) // response.data[0].url

    const url = response.data[0].url
    const path = `./images/${response.created}.jpg`
    await downloadImage(url, path)
}

async function downloadImage(url, filepath) {
    const dir = 'images'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}

export {
    generateImageFromPrompt
}