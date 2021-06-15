import { Command, ApplicationCommandOptionChoice } from "discord.js";
import commands from "./index";

const choices: ApplicationCommandOptionChoice[] = [
  {
    name: "beep",
    value: "1",
  },
  {
    name: "server",
    value: "2",
  },
  {
    name: "user-info",
    value: "3",
  },
];

const command: Command = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,
  options: [
    {
      name: "commands",
      description: "commands list",
      type: "STRING",
      required: true,
      choices,
    },
  ],
  execute(interaction, options) {
    if (!options) {
      interaction.reply("Please choose commands.");
    }

    if (options) {
      const data = [];
      const firstOptions = options.first();
      const value = firstOptions?.value;
      const helping = commands[Number(value)];

      data.push(`**Name:** ${helping.name}`);
      if (helping.aliases)
        data.push(`**Aliases:** ${helping.aliases.join(", ")}`);
      if (helping.description)
        data.push(`**Description:** ${helping.description}`);
      if (helping.usage) data.push(`**Usage:** ${helping.usage}`);
      data.push(`**Cooldown:** ${helping.cooldown || 3} second(s)`);

      interaction.reply({ content: data.join("\n") });
    }
  },
};

export default command;
