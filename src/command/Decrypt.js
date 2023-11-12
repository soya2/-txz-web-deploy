import {Command} from "./Command.js";
import {decrypt} from "../utils/crypto.js";

export class DecryptCommand extends Command {
  key = undefined;
  data = undefined;

  /**
   * @param {String} key decrypt key
   * @param {String} data data
   */
  constructor(key, data) {
    super();
    if (typeof key !== "string" || typeof data !== "string") {
      throw new Error("[DecryptCommand Error]: the type of key and data must be string!");
    }
    this.key = key;
    this.data = data;
  }

  run() {
    try {
      const result = decrypt(this.data, this.key);
      console.log(result);
    } catch (e) {
      throw new Error("[DecryptCommand Error]:" + e);
    }
  }

}