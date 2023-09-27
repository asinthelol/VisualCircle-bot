import { Bot } from '../index.mjs'
import { config } from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
config();



// Folder location for saved images
const imagesFolder = './src/user-content/images'

// Gets the attached image and it's file name, adds to a file path, then writes the file.
export async function saveImage(interaction) {
  const userImageUrl = await interaction.options.get('image').attachment.url;
  const userImageName = await interaction.options.get('image').attachment.name;
  const filePath = path.join(imagesFolder, userImageName)

  fetch(userImageUrl)
    .then((res) => res.arrayBuffer()) // Turns response (the image) into something the computer can actually read
    .then((imageBuffer) => { // imageBuffer is what comes out from calling res.arrayBuffer()
      fs.writeFile(filePath, Buffer.from(imageBuffer), (err) => {
        if(err) {
          console.log(err)
        }
      })
    });
}