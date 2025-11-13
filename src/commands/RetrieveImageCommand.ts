import { SlashCommandBuilder } from "discord.js";



// Look at the code, it tells you everything about the command
export const retrieveImageCommand = new SlashCommandBuilder()
  .setName('retrieveimage')
  .setDescription('Retrieves an image by name.')
  .addStringOption((option) => 
    option
      .setName('name')
      .setDescription('Set the name of the image you want to retrieve.')
      .setRequired(true)
  );