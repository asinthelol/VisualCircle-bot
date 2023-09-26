import { Bot } from '../index.mjs'
import { config } from 'dotenv';
config();



export async function saveImage(interaction) {

  const userImage = await interaction.options.get('image').attachment.url;
    
  return userImage;
}