// Imports I need
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
config();

// Bot command improts
import { remindMe } from './functions/remindMe.mjs';
import { saveImage } from './functions/saveImage.mjs';



// Bot startup. <!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>



const Bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

Bot.once('ready', (c) => { // c is an instance of the bot (client)
  console.log(`${c.user.username} ready to go.`);
  
  Bot.user.setPresence({
    activities: [{ name: 'the market',}],
    status: 'online',
  });
})

Bot.login(process.env.TOKEN); // Takes the bot token. DO NOT SHARE IT!



// Functions I care about. <!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>



// Bot sends an inputted message to the user.
Bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isChatInputCommand) { return; }
  if(interaction.commandName == 'remindme') {

    const userTime = (await remindMe(interaction)).userTime;
    interaction.reply(`> ✅  Reminder set for ${userTime}!`)
  }
});

// Bot sends image to user (saving it in a sense)
Bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isChatInputCommand) { return; }
  if(interaction.commandName == 'saveimage') {
    let userMessage = await saveImage(interaction);
    console.log(userMessage);
    interaction.reply(userMessage);

  }
})


// Export for other functions.
export { Bot };