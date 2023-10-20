// Imports I need
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
config();

// Bot command imports
import { remindMe } from './functions/remindMe.mjs';
import { saveImage } from './functions/saveImage.mjs';
import { getImage } from './functions/getImage.mjs';



// Bot startup.
const Bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

Bot.once('ready', (c) => { // c is an instance of the bot (client).
  Images.sync();
  console.log(`${c.user.username} ready to go.`);
  
  Bot.user.setPresence({
    activities: [{ name: 'the world',}],
    status: 'online',
  });
})

Bot.login(process.env.TOKEN); // Takes the bot token. DO NOT SHARE IT!



// Functions I care about.



// Bot sends an inputted message to the user.
Bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isChatInputCommand) { return; }
  if(interaction.commandName == 'remindme') {

    const userTime = (await remindMe(interaction)).userTime;
    interaction.reply(`> ✅  Reminder set for ${userTime}!`)
  }
});

// Bot saves image that user sends to an image folder.
Bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isChatInputCommand) { return; }
  if(interaction.commandName == 'saveimage') {
    saveImage(interaction);
    interaction.reply('Image saved! ✅');

  }
})

Bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand) { return; }
  if (interaction.commandName === 'getimage') { 

    const imagePath = await getImage(interaction);

    await interaction.deferReply()

    if(imagePath) {
      fs.readFile(imagePath, async (err, image) => {

        if (err) {
          console.error('Error reading file:', err);
          await interaction.editReply('Sorry, I cannot retrieve the file!')
        } else if (image) interaction.editReply({
          files: [imagePath],
          content: 'Here\'s the image!'
        });
        else {
            console.log('Image not in fs.')
            await interaction.editReply('Image is not in the file system!')
          }
      });
    } else {
      console.log('Image not in db.')
      await interaction.editReply('image not found!')
    }
  }
});




// MySQL Stuff



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: 'localhost',
	dialect: process.env.DB_DIALECT,
	logging: false,
});

const Images = sequelize.define('images', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    img_dir: {
      type: Sequelize.STRING,
      allowNull: false
    },
    artist_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    source: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false
  }

);


export { Bot, Images };