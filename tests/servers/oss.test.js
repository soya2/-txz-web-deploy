import {describe, expect, test} from "@jest/globals";
import {OssServer} from "../../src/servers/oss.js";
import testConfig from "../utils/test.config.js";

describe("oss servers tests", () => {
  test("init tests", () => {
    const oss = new OssServer(testConfig.ossConfig);
    expect(oss.canUpload("/a.html")).toBeTruthy()
  })
  test("put tests", () => {
    const oss = new OssServer();
    expect(oss.put("", "")).toBeTruthy()
  })
})
