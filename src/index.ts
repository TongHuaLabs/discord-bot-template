import Discord, { Intents, Message } from "discord.js";
import dotenv from "dotenv";
import { slashCommands } from "./slash";

dotenv.config();
if (!process.env.BOT_TOKEN || !process.env.BOT_COMMAND_PREFIX) process.exit(0);

const intents = new Intents(Intents.NON_PRIVILEGED);
export const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL"],
  intents: intents,
});

slashCommands();

client.login(process.env.BOT_TOKEN);
