# Discord Bot Template

A discord bot template with a command handler coded in typescript.

## Setup

1. Install dependencies

   ```bash
   $ yarn install
   ```

2. Create .env file

   ```env
   BOT_TOKEN=
   BOT_COMMAND_PREFIX=
   ```

## Development

```bash
$ yarn dev
```

## Production

```bash
$ yarn build
$ yarn start
```

## Adding commands

1. Create `command-name.ts` file in `commands` folder

   ```typescript
   import { Command } from 'discord.js';

   const command: Command = {
     name: 'command-name',
     description: 'Command description here',
     execute(message) {
       message.channel.send('Hello');
     },
   };

   export default command;
   ```

2. Import and export new command in `commands/index.ts`

## References

1. Discord.js Libary - <https://discord.js.org/>
