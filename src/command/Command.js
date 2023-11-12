export class Command {
  run() {
    return new Promise(resolve => {
      console.log("[Command Warning]: unknown command, please use 'txz-web-deploy --help' to view all commands.");
      resolve();
    })
  }
}