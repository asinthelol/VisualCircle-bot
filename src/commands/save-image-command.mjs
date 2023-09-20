import { ApplicationCommandOptionType } from "discord.js";

const saveImageCommand = {
  data: {
    name: 'saveimage',
    description: 'Saves whatever image the user attaches.',
    options:
      [{
        name: 'image',
        description: 'Attach your image.',
        type: ApplicationCommandOptionType.Attachment,
        required: true
      }
    ]
  }
};

// Use JSON.stringify to convert to JSON
export const saveImageCommandJSON = JSON.stringify({
  name: saveImageCommand.data.name,
  description: saveImageCommand.data.description,
  options: saveImageCommand.data.options
});