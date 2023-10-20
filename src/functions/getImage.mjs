import { Images } from '../index.mjs'
import { config } from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

async function retrieveImage(interaction) {
    const userImageId = await interaction.options.get('image').value;

  const image = Images.findOne({
    where: {
      id: userImageId
    }
  })

  return image
}

export async function getImage(interaction) {

  const image = await retrieveImage(interaction)

  if(image) { return image.dataValues.img_dir }
}