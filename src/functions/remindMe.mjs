import { Bot } from '../index.mjs'
import { config } from 'dotenv';
config();



// Reminds the user of whatever they want to hear in < 24 hours.
export async function remindMe(interaction) {
  
  // Get's current time in miliseconds. Current time is the time when /remindme is called.
  const Time = new Date();
  const currentHour = (Time.getHours()) * 60;
  const currentMinute = Time.getMinutes();
  const timeInMinutes = (currentHour + currentMinute) * 1000; // Converts the time to miliseconds.
  const oneDay = 86400000; // 24hrs.

  const userMessage = JSON.stringify(interaction.options.getString('message')).replace(/"/g, ''); 
  const userTime = JSON.stringify(interaction.options.getString('time')).replace(/"/g, ''); // Time user wants to recieve message.
  const [userHour, userMinute] = userTime.split(':').map(Number);
  const uTimeInMinutes = ((userHour * 60) + userMinute) * 1000; // Converts the time to miliseconds.
  const delay = ((uTimeInMinutes - timeInMinutes) < 0) ? (uTimeInMinutes - timeInMinutes) * 60  + oneDay : (uTimeInMinutes - timeInMinutes) * 60; // the delay was always 1/60th of what it needed to be...
    
  setTimeout(async () => {
      try {
        await Bot.users.send(
          interaction.user.id,
          `:dart:  Reminder for ${userTime} :dart:\n>>> ` + userMessage
          );
      } catch(err) {
        console.log('found an error')
      }
    }, delay);

    return { userTime };

}