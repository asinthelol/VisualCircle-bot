import { SlashCommandBuilder } from "discord.js";



// Look at the code, it tells you everything about the command
export const getImageCommand = new SlashCommandBuilder()
  .setName('getimage')
  .setDescription('Retrieves an image depending on the image number.')
  .addStringOption((option) => 
    option
      .setName('image')
      .setDescription('Enter the image number.')
      .setRequired(true)
  );