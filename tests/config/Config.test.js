import path from "node:path";
import {describe, expect, test} from "@jest/globals";
import {Config} from "../../src/config/Config.js";
import testConfig from "../utils/test.config.js";

describe("Config class tests", () => {
  test("init tests", () => {
    const config = new Config();
    config.setEnv("test");
    expect(config.env()).toBe("test");
    expect(() => config.setEnv(null)).toThrowError();
  })
  test("getter success tests", () => {
    const workspace = path.resolve("../utils/testFolder");
    const config = new Config(testConfig);
    config.setEnv("test");
    expect(config.workspace).toBe(workspace);
    expect(config.ossConfig.servers.secure).toBeTruthy();
    expect(config.ftpConfig.includes).toStrictEqual([".html"]);
  })
  test("getter failed tests", () => {
    const workspace = path.resolve("../utils/testFolder");
    testConfig.ossConfig.servers = null;
    const config = new Config(testConfig);
    expect(config.ossConfig).toBeFalsy();
    expect(config.ftpConfig).toBeFalsy();
    testConfig.ftpConfig.servers = null;
    const config_1 = new Config(testConfig);
    config_1.setEnv("online");
    expect(config_1.ftpConfig).toBeFalsy();
  })
  test("get config test", async () => {
    expect.assertions(1);
    try {
      const config = await Config.getConfig();
      expect(config.debug).toBeTruthy();
    } catch (e) {
      console.log(__dirname)
      const str = path.resolve(__dirname, "../../txzDeploy.config.js");
      expect(e.message).toBe(`[Config Error]: no find config file 'txzDeploy.config.js' in '${str}' or parsing failed`);
    }
  })
})
