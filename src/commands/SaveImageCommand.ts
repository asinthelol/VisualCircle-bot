import {SlashCommandBuilder } from "discord.js";



// Look at the code, it tells you everything about the command
export const saveImageCommand = new SlashCommandBuilder()
  .setName('saveimage')
  .setDescription('Saves whatever image the user attaches.')
  .addAttachmentOption((option) => 
    option
      .setName('image')
      .setDescription('Attach your image.')
      .setRequired(true)
  )
  .addStringOption((option) => 
    option
      .setName('name')
      .setDescription('Set the name of the image you want to save.')
      .setRequired(true)
  );