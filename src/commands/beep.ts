import { Command } from "discord.js";

const command: Command = {
  name: "beep",
  description: "Beep!",
  usage: "/beep",
  execute(interaction) {
    interaction.reply("Boop");
  },
};

export default command;
