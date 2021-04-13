import { Command } from 'discord.js';

const command: Command = {
  name: 'beep',
  description: 'Beep!',
  execute(message) {
    message.channel.send('Boop.');
  },
};

export default command;
