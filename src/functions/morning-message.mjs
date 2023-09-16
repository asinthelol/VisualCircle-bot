import { Client, GatewayIntentBits } from 'discord.js';
import { Bot } from '../index.mjs'
import { config } from 'dotenv';
config();



// Functions I care about. <!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>



//Checks time so bot sends a good morning message to a user and tells them to not panic buy any options.
const marketDays = [1, 2, 3, 4, 5]; // 1-5 being Monday-Friday.

export function checkTime() {
  const Time = new Date();
  const currentTime = `${Time.getHours()}:${Time.getMinutes()}`;
  const currentDay = Time.getDay();

  if(currentTime == '9:0') { // 09:00
    Bot.users.send(process.env.USERID,
    'Good morning ');
    }
  if(marketDays.includes(currentDay)) {
    Bot.users.send(process.env.USERID,
    'Remember, do not panic buy any options. It will be hard, but try your best.');
  }
}