import Discord from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands';

dotenv.config();
if (!process.env.BOT_TOKEN || !process.env.BOT_COMMAND_PREFIX) process.exit(0);

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.commandPrefix = process.env.BOT_COMMAND_PREFIX;

commands.forEach((command) => {
  client.commands.set(command.name, command);
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  const { commandPrefix } = message.client;
  if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

  const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase(); // shift mutates args

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => !!cmd.aliases && cmd.aliases.includes(commandName),
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.permissions) {
    let authorPerms =
      message.channel.type !== 'dm'
        ? message.channel.permissionsFor(message.author)
        : null;

    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can not do this!');
    }
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${commandPrefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name)!; // above cooldown set made sure `timestamps` exists
  const cooldownAmount = (command.cooldown || 3) * 1000; // default cooldown is 3 seconds

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id)! + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1,
        )} more second(s) before reusing the \`${command.name}\` command.`,
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.BOT_TOKEN);
