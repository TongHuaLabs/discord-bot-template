import { Command } from "discord.js";

const command: Command = {
  name: "server",
  description: "Display info about this server.",
  usage: "/server",
  execute(interaction) {
    if (!interaction.guild) return; // message is from DM
    interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  },
};

export default command;
