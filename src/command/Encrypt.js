import {Command} from "./Command.js";
import {encrypt} from "../utils/crypto.js";

export class EncryptCommand extends Command {
  key = undefined;
  data = undefined;

  /**
   * @param {String} key encrypt key
   * @param {String} data data
   */
  constructor(key, data) {
    super();
    if (typeof key !== "string" || typeof data !== "string") {
      throw new Error("[EncryptCommand Error]: the type of key and data must be string!");
    }
    this.key = key;
    this.data = data;
  }

  run() {
    try {
      const result = encrypt(this.data, this.key);
      console.log(result);
    } catch (e) {
      throw new Error("[EncryptCommand Error]:" + e);
    }
  }

}