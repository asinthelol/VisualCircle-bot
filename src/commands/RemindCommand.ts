import { ApplicationCommandOptionType, SlashCommandBuilder } from "discord.js";



// Look at the code, it tells you everything about the command
export const remindMeCommand = new SlashCommandBuilder()
  .setName('remindme')
  .setDescription('reminds the user whatever they want, at whatever time')
  .addStringOption((option) => 
    option
      .setName('message')
      .setDescription('Set the message you want to be reminded of.')
      .setRequired(true)
  )
  .addStringOption((option) => 
    option
    .setName('time')
    .setDescription('Set the time you want to receive the message. Format time as 00:00')
    .setRequired(true)
  ).toJSON();