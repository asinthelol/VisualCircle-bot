import { Bot } from '../index'
import { config } from 'dotenv';
import { ChatInputCommandInteraction } from 'discord.js';
config();



// Reminds the user of whatever they want to hear in < 24 hours.
export async function remindMe(interaction: ChatInputCommandInteraction): Promise<{ time: string; }>{
  
  // Get's current time in miliseconds. Current time is the time when /remindme is called.
  const Time = new Date();
  const currentHour = (Time.getHours()) * 60;
  const currentMinute = Time.getMinutes();
  const timeInMinutes = (currentHour + currentMinute) * 1000; // Converts the time to miliseconds.
  const oneDay = 86400000; // 24hrs in miliseconds.
  const timeMarkers: string[] = ['m', 'h', 'd']; // minutes, hours, days.

  const userMessage = JSON.stringify(interaction.options.getString('message')).replace(/"/g, ''); 
  const userTimeInput = JSON.stringify(interaction.options.getString('time')).replace(/"/g, ''); // Time user wants to recieve message.

  const [userTime, timeUnit] = [userTimeInput.slice(0, -1), userTimeInput.slice(-1)]; // Splits the time and the unit (s/m/h/d).

  let delay: number;
  switch (timeUnit) {
    case 'm':
      delay = parseInt(userTime) * 60 * 1000;
    case 'h':
      delay = parseInt(userTime) * 60 * 60 * 1000;
    case 'd':
      delay = parseInt(userTime) * 24 * 60 * 60 * 1000;
    default:
      delay = parseInt(userTime) * 60 * 1000; // Default to minutes if no unit is provided.
  }

  setTimeout(async () => {
    try {
      await Bot.users.send(
        interaction.user.id,
        `:dart:  Reminder for ${userTimeInput} :dart:\n>>> ` + userMessage
      );
    } catch(err) {
      console.log('found an error')
    }
  }, delay);

  return { time: userTimeInput };
}