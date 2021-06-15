import { Command, CommandInteraction } from "discord.js";

const command: Command = {
  name: "user-info",
  description: "Display info about yourself.",
  usage: "/user-info",
  execute(interaction) {
    if (interaction instanceof CommandInteraction) {
      interaction.reply(
        `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
      );
    }
  },
};

export default command;
