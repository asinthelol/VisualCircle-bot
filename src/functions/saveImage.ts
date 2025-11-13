import { config } from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma';
config();


// Folder location for saved images
const imagesFolder = './src/user-content/images'

// Gets the attached image and it's file name, adds to a file path, then writes the file.
export async function saveImage(interaction) {
  const userImageUrl = await interaction.options.get('image').attachment.url;
  const userImageName = await interaction.options.get('name').value;
  const ImageName = await interaction.options.get('image').attachment.name;
  const filePath = path.join(imagesFolder, ImageName)

  const imageRecord = await prisma.image.findFirst({
    where: { name: userImageName },
  });

  if (imageRecord) {
    throw new Error('Image name already exists.');
  }

  fetch(userImageUrl)
    .then((res) => res.arrayBuffer()) // Turns response (the image) into something the computer can actually read
    .then((imageBuffer) => {
      fs.writeFile(filePath, Buffer.from(imageBuffer), (err) => {
        if(err) {
          console.log(err)
        }
      })
    });

  await prisma.image.create({
    data: {
      name: userImageName,
      url: filePath,
      uploadedAt: new Date(),
    }
  });
}