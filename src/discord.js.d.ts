import {
  Message,
  PermissionResolvable,
  CommandInteraction,
  ApplicationCommandOption,
} from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Collection<string, number>>;
    commandPrefix: string;
  }

  export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    args?: boolean;
    usage?: string;
    guildOnly?: boolean;
    cooldown?: number;
    permissions?: PermissionResolvable;
    options?: ApplicationCommandOption[];
    execute: (
      message: CommandInteraction,
      options?: Collection<string, CommandInteractionOption>
    ) => void;
  }
}
