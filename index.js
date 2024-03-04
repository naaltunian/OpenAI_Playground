import readlineSync from 'readline-sync'
import "dotenv/config.js";
import { generateImageFromPrompt } from './service/image.js'

async function main() {
    const options = ['Chat', 'Image Generation']
    const response = readlineSync.keyInSelect(options, 'What would you like to do?')

    switch (response) {
        case 0:
            console.log('Chat coming soon')
            break
        case 1:
            generateImageFromPrompt()
            break
        case -1:
            console.log('exiting...')
            break
        default:
            console.log('invalid response')
            break
    }
}

main();