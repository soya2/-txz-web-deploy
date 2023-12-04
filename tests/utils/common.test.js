import {describe, expect, test} from "@jest/globals";
import {deepMerge} from "src/utils/common.js"
import defaultConfig from "../../src/config/default.config.js";
import testConfig from "./test.config.js";

describe("common utils tests", () => {
  test("deep merge test", () => {
    const config = deepMerge(defaultConfig, testConfig);
    expect(defaultConfig.targetFolder).toBe("")
    expect(config.targetFolder).toBe("../utils/testFolder")
  })
})
