import { REST, Routes } from "discord.js";
import { config } from "dotenv";
config();

// Imports commands
import { remindMeCommand } from "./remind-me-command.mjs";
import { saveImageCommand } from "./save-image-command.mjs";
import { getImageCommand } from "./get-image-command.mjs";

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); // Rest makes a request to Discord API using the bot.
const commands = [ remindMeCommand, saveImageCommand, getImageCommand ];

(async () => { // Async because you're dealing with HTTP requests; You have to wait for them.
  try {
    console.log('slash command attempt');

    await rest.put(
      Routes.applicationGuildCommands( // Route provides templates for actions you can do in discord.
        process.env.BOT_ID,
        process.env.GUILD_ID
        ),
        { body: commands }
    );

    console.log('it prob went through')
  } catch(err) {
    console.log(err)
  }
})();
