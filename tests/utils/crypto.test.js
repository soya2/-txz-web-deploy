import {describe, test, expect} from "@jest/globals";
import {encrypt, decrypt} from "src/utils/crypto.js"

describe("crypto utils tests", () => {
  const KEY = "TEST_KEY";
  test("encrypt tests", () => {
    expect(encrypt("test", KEY)).toBe("1c57ffe740744f217adfa946771ce35a");
  });
  test("encrypt number string", () => {
    expect(encrypt("2000 01 01", KEY)).toBe("2e5da0e4dcdc54d2c393d26831f3d5bf");
  });
  test("encrypt empty string", () => {
    expect(encrypt("", KEY)).toBe("7449109207585faa917a114b52ceac08");
  });
  test("encrypt blank string", () => {
    expect(encrypt("     ", KEY)).toBe("6ccae67632a51b4658c1041092005688");
  });

  test("decrypt tests", () => {
    expect(decrypt("1c57ffe740744f217adfa946771ce35a", KEY)).toBe("test");
  });
  test("decrypt number string", () => {
    expect(decrypt("2e5da0e4dcdc54d2c393d26831f3d5bf", KEY)).toBe("2000 01 01");
  });
  test("decrypt empty string", () => {
    expect(decrypt("7449109207585faa917a114b52ceac08", KEY)).toBe("");
  });
  test("decrypt blank string", () => {
    expect(decrypt("6ccae67632a51b4658c1041092005688", KEY)).toBe("     ");
  });
});
