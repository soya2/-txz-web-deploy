import {describe, expect, test} from "@jest/globals";
import {FTPServer} from "../../src/servers/ftp.js";
import testConfig from "../utils/test.config.js";

describe("ftp servers tests", () => {
  test("init tests", () => {
    const ftps = FTPServer.createClients(testConfig.ftpConfig, "test", "TEST_KEY");
    expect(ftps[0].canUpload("/a.css")).toBeFalsy()
    expect(() => ftps[0].traceLog("a", "b")).toBeTruthy()
  })
  test("init empty list tests", () => {
    const ftps_2 = FTPServer.createClients(undefined, "", "");
  })
})
