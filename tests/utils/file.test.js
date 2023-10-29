import {describe, expect, test} from "@jest/globals";
import {readFileList} from "src/utils/file.js";

describe("file utils tests", () => {
  test("read exist folder", async () => {
    expect.assertions(1);
    try {
      const workspace = __dirname + "/testFolder";
      const list = await readFileList(workspace)
      expect(list).toStrictEqual([
        workspace + "/index.html",
        workspace + "/script.js",
        workspace + "/style.css",
        workspace + "/subFolder/a.json",
      ])
    } catch (e) {
      expect(e.message).toBe("path does not exist")
    }
  });
  test("read not exist folder", async () => {
    expect.assertions(1);
    try {
      await readFileList("/not_exist_folder")
    } catch (e) {
      expect(e.message).toBe("path does not exist")
    }
  })
});

