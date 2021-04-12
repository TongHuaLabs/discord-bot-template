import Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.BOT_TOKEN) process.exit(0);

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);
