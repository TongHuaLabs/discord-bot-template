import { client } from "./index";
import commands from "./commands";

export const slashCommands = () => {
  client.on("ready", async () => {
    console.log("Slash commands is ready!");

    if (!client.application?.owner) await client.application?.fetch();
    const data = commands.map((command) => ({
      name: command.name,
      description: command.description,
      options: command.options,
    }));

    await client.guilds.cache.get(`851127231278481409`)?.commands.set(data);

    client.on("interaction", async (interaction) => {
      if (!interaction.isCommand()) return;
      const { options } = interaction;
      try {
        for (const command of commands) {
          if (interaction.commandName === command.name) {
            command.execute(interaction, options);
          }
        }
      } catch (error) {
        console.error(error);
        interaction.reply("there was an error trying to execute that command!");
      }
    });
  });
};
