import { REST, Routes } from "discord.js";
import { config } from "dotenv";
config();

// Imports commands
import { remindMeCommand } from "./RemindCommand";
import { saveImageCommand } from "./SaveImageCommand";

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN as string); // Rest makes a request to Discord API using the bot.
const commands = [
  remindMeCommand,
  saveImageCommand
];

(async () => { // Async because you're dealing with HTTP requests; You have to wait for them.
  try {
    console.log('Deploying commands...');

    await rest.put(
      Routes.applicationCommands( // Route provides templates for actions you can do in discord.
        process.env.BOT_ID as string,
        // process.env.GUILD_ID
        ),
        { body: commands }
    );

    console.log('Commands deployed successfully.');
  } catch(err) {
    console.log(err)
  }
})();
