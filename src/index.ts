// Imports I need
import { Client, GatewayIntentBits, ChatInputCommandInteraction, Interaction } from 'discord.js';
import { config } from 'dotenv';
import { prisma } from './lib/prisma';
config();

// Bot command imports
import { remindMe } from './functions/remindMe';
import { saveImage } from './functions/saveImage';
import { retrieveImage } from './functions/retrieveImage';



// Bot startup.
const Bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

Bot.once('clientReady', (client: Client) => {
  if (!client.user) {
    console.error('Client user is undefined on ready event.');
    return;
  }

  console.log(`${client.user.username} ready to go.`);

  if (!Bot.user) {
    console.error('Bot user is undefined when setting presence.');
    return;
  }

  Bot.user.setPresence({
    activities: [{ name: '@asinthelol',}],
    status: 'online',
  });
});

// Validate token before attempting login so the error is clearer for developers.
const token = process.env.TOKEN;
if (!token || typeof token !== 'string' || token.trim() === '') {
  console.error('Missing or empty TOKEN environment variable.\n' +
    'Create a .env file with TOKEN=your_bot_token or set the TOKEN env var in your shell and try again.\n' +
    "PowerShell example: $env:TOKEN='your_bot_token'; node src/index.mjs");
  process.exit(1);
}

Bot.login(token).catch((err) => {
  console.error('Failed to login to Discord:', err?.message ?? err);
  process.exit(1);
}); // Takes the bot token. DO NOT SHARE IT!



// Functions I care about.



// Bot sends an inputted message to the user.
Bot.on('interactionCreate', async (interaction: Interaction) => {
  if(!interaction.isChatInputCommand) { return; }

  const cmd = interaction as ChatInputCommandInteraction;
  if(cmd.commandName == 'remindme') {

    const userTime = (await remindMe(cmd)).time;
    cmd.reply(`> :white_check_mark:  Reminder set for ${userTime}!`)
  }
});

// Bot saves image that user sends to an image folder.
Bot.on('interactionCreate', async (interaction: Interaction) => {
  if(!interaction.isChatInputCommand) { return; }

  const cmd = interaction as ChatInputCommandInteraction;
  if(cmd.commandName == 'saveimage') {
    await cmd.deferReply();
    try {
      await saveImage(cmd);
      await cmd.editReply('Image saved! :white_check_mark:');
    } catch (error) {
      console.error(error);
      await cmd.editReply('Failed to save image. Image name may already exist.');
    }
  }
});

Bot.on('interactionCreate', async (interaction: Interaction) => {
  if(!interaction.isChatInputCommand) { return; }

  const cmd = interaction as ChatInputCommandInteraction;

  if(cmd.commandName == 'retrieveimage') {
    await cmd.deferReply();
    try {
      const imageBuffer = await retrieveImage(cmd.options.getString('name') as string);
      if (imageBuffer) {
        await cmd.editReply({ content: 'Image Found!', files: [{ attachment: imageBuffer }] });
      } else {
        await cmd.editReply('Image not found.');
      }
    } catch (error) {
      console.error(error);
      cmd.reply('An error occurred while retrieving the image.');
    }
  }
});
// Handle Ctrl+C (SIGINT) and graceful termination (SIGTERM)
process.on('SIGINT', async () => {
  console.log('SIGINT received: disconnecting Prisma and shutting down.');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received: disconnecting Prisma and shutting down.');
  await prisma.$disconnect();
  process.exit(0);
});

// Handle unhandled rejections / uncaught exceptions
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled Rejection:', reason);
  try { await prisma.$disconnect(); } catch {}
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  try { await prisma.$disconnect(); } catch {}
  process.exit(1);
});


// Export for other functions.
export { Bot };