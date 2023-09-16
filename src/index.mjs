import { Client, GatewayIntentBits } from 'discord.js';
import PresenceData from 'discord.js';
import { checkTime } from './functions/morning-message.mjs';
import { config } from 'dotenv';
config();


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
    activities: [{ name: '2048',}],
    status: 'online',
  });
})

Bot.login(process.env.TOKEN); // Takes the bot token. DO NOT SHARE IT!



// Functions I care about. <!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>


//Checks time so bot sends a good morning message to a user and tells them to not panic buy any options.
setInterval(checkTime, 60000);



// Export for other functions.
export { Bot };