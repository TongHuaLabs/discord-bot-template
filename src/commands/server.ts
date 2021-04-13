import { Command } from 'discord.js';

const command: Command = {
  name: 'server',
  description: 'Display info about this server.',
  execute(message) {
    if (!message.guild) return; // message is from DM

    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
    );
  },
};

export default command;
