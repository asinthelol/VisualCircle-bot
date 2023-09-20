import { Bot } from '../index.mjs'
import { config } from 'dotenv';
config();



export async function saveImage(interaction) {

  const userMessage = interaction.options.attachment;
    
  async () => {
    try {
      console.log(userMessage)
    } catch(err) {
      console.log('found an error')
    }
  }
  return userMessage;
}