import { Command } from 'discord.js';

const command: Command = {
  name: 'user-info',
  description: 'Display info about yourself.',
  execute(message) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
    );
  },
};

export default command;
