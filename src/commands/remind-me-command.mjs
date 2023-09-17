import { ApplicationCommandOptionType } from "discord.js";

const remindMeCommand = {
  data: {
    name: 'remindme',
    description: 'reminds the user whatever they want, at whatever time',
    options:
      [{
        name: 'message',
        description: 'Set message you wants to be reminded of.',
        type: ApplicationCommandOptionType.String,
        required: true
      },
    {
      name: 'time',
      description: 'Set the time you want to receive the message. Format time as 00:00',
      type: ApplicationCommandOptionType.String,
      required: true
    }]
  }
};

// Use JSON.stringify to convert to JSON
export const remindMeCommandJSON = JSON.stringify({
  name: remindMeCommand.data.name,
  description: remindMeCommand.data.description,
  options: remindMeCommand.data.options
});

console.log(remindMeCommandJSON);
