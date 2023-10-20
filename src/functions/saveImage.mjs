import { Images } from '../index.mjs'
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';



// Folder location for saved images
const imagesFolder = './src/user-content/images'

// Gets the attached image and its file name, adds to a file path, then writes the file.
export async function saveImage(interaction) {
  const userImageUrl = await interaction.options.get('image').attachment.url;
  const userImageName = await interaction.options.get('image').attachment.name;
  const userSource = await interaction.options.get('source')
  const userArtistName = await interaction.options.get('artist');

  let artSource;
  let artistName;
  if(userArtistName) artistName = userArtistName.value.value
  if(userSource) artSource = userSource.value
  
  
  const filePath = path.join(imagesFolder, userImageName);

  fetch(userImageUrl)
    .then((res) => res.arrayBuffer()) // Turns response (the image) into something the computer can actually read (binary data)
    .then((imageBuffer) => { // imageBuffer is what's returned from calling res.arrayBuffer()
      fs.writeFile(filePath, Buffer.from(imageBuffer), (err) => { // Buffer.from creates a new Buffer object based on imageBuffer
        if(err) { console.log(err) }
      })
    });

  try {
    const imageRow = Images.create({
      name: userImageName,
      img_dir: filePath,
      artist_name: artistName,
      source: userSource,
    });    
  } catch(err) {
    console.log(err)
  }
}