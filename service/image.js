import OpenAI from 'openai';
import readlineSync from 'readline-sync'
import Axios from 'axios'
import fs from 'fs'

async function generateImageFromPrompt() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = readlineSync.question('Provide an image description ')

    try {
        const response = await openai.images.generate({
            model: process.env.IMAGE_MODEL,
            prompt,
            n: 1,
            size: '1024x1024',
        });
    
        const url = response.data[0].url
        const path = `./images/${response.created}.jpg`
        await downloadImage(url, path)
    } catch (error) {
        console.log('Error creating image:', error)
    }
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