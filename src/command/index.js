import {Command} from "./Command.js";
import {EncryptCommand} from "./Encrypt.js";
import {DecryptCommand} from "./Decrypt.js";
import {PushCommand} from "./Push.js";
import {HelpCommand} from "./HelpCommand.js";

const COMMAND_ENUM = Object.freeze({
  ENCRYPT: "encrypt",
  DECRYPT: "decrypt",
  PUSH: "push",
  DASH_HELP: "--help",
  DASH_H: "-h",
});
/**
 *
 * @param {String[]} args
 * @return {Command}
 */
export function commandFactor(args) {
  const [_, __, command, ...anotherArgs] = args;
  switch (command) {
    case COMMAND_ENUM.ENCRYPT:
      return new EncryptCommand(anotherArgs[0], anotherArgs[1]);
    case COMMAND_ENUM.DECRYPT:
      return new DecryptCommand(anotherArgs[0], anotherArgs[1]);
    case COMMAND_ENUM.PUSH:
      return new PushCommand(anotherArgs[0], anotherArgs[1]);
    case COMMAND_ENUM.DASH_HELP:
    case COMMAND_ENUM.DASH_H:
      return new HelpCommand();
    default:
      return new Command();
  }
}