import path from "node:path";
import {deepMerge} from "../utils/common.js";
import {BaseServer} from "../servers/base.js";
import defaultConfig from "./default.config.js";

export class Config {
  _deployEnv = "";
  _config = {};

  /**
   * @param {Object} configObject
   */
  constructor(configObject = defaultConfig) {
    this._config = configObject;
    BaseServer.setDebugModel(this._config.debug);
  }

  get workspace() {
    return path.resolve(this._config.targetFolder);
  }

  get ossConfig() {
    if (this._config.ossConfig.servers) {
      return this._config.ossConfig;
    } else {
      Config.makeWarning("oss servers config does not exist!");
    }
  }

  get ftpConfig() {
    if (this._config.ftpConfig.servers) {
      if (this._config.ftpConfig.servers[this._deployEnv]) {
        return this._config.ftpConfig;
      } else {
        Config.makeWarning(`ftp servers config "${this._deployEnv}" does not exist!`);
      }
    } else {
      Config.makeWarning(`ftp servers config does not exist!`);
    }
  }

  /**
   * env name, configure the key name in the ftp config object
   * @param {String} env
   */
  setEnv(env) {
    if (env) {
      this._deployEnv = env;
      BaseServer.setEnv(this._deployEnv);
    } else {
      Config.makeError("a deployment environment must exist!");
    }
  }

  /**
   * get deploy env
   * @returns {string}
   */
  env() {
    return this._deployEnv;
  }

  /**
   * get user configuration through file name 'txzDeploy.config.js'
   * @returns {Promise<Object>}
   */
  static async getConfig() {
    const targetConfigFilePath = path.resolve("txzDeploy.config.js")
    try {
      const moduleExports = await import(targetConfigFilePath);
      return deepMerge(defaultConfig, moduleExports.default);
    } catch (e) {
      Config.makeError(`no find config file 'txzDeploy.config.js' in '${targetConfigFilePath}' or parsing failed`);
    }
  }

  /**
   * @param {String} msg
   */
  static makeError(msg) {
    throw new Error(`[Config Error]: ${msg}`);
  }

  static makeWarning(msg) {
    console.warn("[Config Warning]:", msg)
  }
}
