import {Command} from "./Command.js";

const HELP_INFO = `
txz-web-deploy 
  Usage:
    txz-web-deploy encrypt <key> <data>,
    txz-web-deploy decrypt <key> <data>,
    txz-web-deploy push <env> <key>,
    txz-web-deploy -h | --help,
  Options:
    -h, --help  show the help info.
`

export class HelpCommand extends Command {
  run() {
    console.log(HELP_INFO);
  }
}