import {SlashCommandBuilder, ApplicationCommandOptionType } from "discord.js";

export const saveImageCommand = new SlashCommandBuilder()
  .setName('saveimage')
  .setDescription('Saves whatever image the user attaches.')
  .addAttachmentOption((option) => 
    option
      .setName('image')
      .setDescription('Attach your image.')
      .setRequired(true)
  )