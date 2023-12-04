import {describe, test, expect, beforeEach, jest, afterEach} from "@jest/globals";
import {commandFactor} from "../../src/command/index.js"

let originConsoleLog;
const KEY = "TEST_KEY"
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

describe("command factor test", () => {
  beforeEach(() => {
    originConsoleLog = global.console.log;
    global.console.log = jest.fn();
  })
  afterEach(() => {
    global.console.log = originConsoleLog;
  });
  test("unknown command", async () => {
    expect.assertions(1);
    const command = commandFactor(["", "", "unknownCommand", "somethingArgs"]);
    await command.run();
    expect(global.console.log).toHaveBeenCalledWith("[Command Warning]: unknown command, please use 'txz-web-deploy --help' to view all commands.")
  });
  test("-h command", async () => {
    expect.assertions(1);
    const command = commandFactor(["", "", "-h"]);
    await command.run();
    expect(global.console.log).toHaveBeenCalledWith(HELP_INFO)
  });
  test("--help command", async () => {
    expect.assertions(1);
    const command = commandFactor(["", "", "--help"]);
    await command.run();
    expect(global.console.log).toHaveBeenCalledWith(HELP_INFO)
  });
  test("encrypt command", () => {
    const command = commandFactor(["", "", "encrypt", KEY, "test"]);
    command.run();
    expect(global.console.log).toHaveBeenCalledWith("1c57ffe740744f217adfa946771ce35a");
  });
  test("encrypt command and error key", () => {
    try {
      commandFactor(["", "", "encrypt", 123, "test"]);
    } catch (e) {
      expect(e.message.includes("[EncryptCommand Error]: the type of key and data must be string!")).toBeTruthy();
    }
  });
  test("decrypt command", () => {
    const command = commandFactor(["", "", "decrypt", KEY, "1c57ffe740744f217adfa946771ce35a"]);
    command.run();
    expect(global.console.log).toHaveBeenCalledWith("test");
  });
  test("decrypt command and error key", () => {
    try {
      const command = commandFactor(["", "", "decrypt", 123, "test"]);
      command.run();
    } catch (e) {
      expect(e.message.includes("[DecryptCommand Error]: the type of key and data must be string!")).toBeTruthy();
    }
  });
  test("decrypt command fail", () => {
    try {
      const command = commandFactor(["", "", "decrypt", "someErrorKey", "1c57ffe740744f217adfa946771ce35a"]);
      command.run();
    } catch (e) {
      expect(e.message.includes("[DecryptCommand Error]:")).toBeTruthy();
    }
  });
  test("push command", async () => {
    try {
      const command = commandFactor(["", "", "push", "test", "TEST_KEY"]);
      await command.run()
    } catch (e) {

    }
  })
});