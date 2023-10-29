import path from "node:path";

export class BaseServer {
  static isDebug = false;
  static ENV = undefined;

  /**
   * @param {Boolean} status
   */
  static setDebugModel(status) {
    BaseServer.isDebug = Boolean(status);
  }

  /**
   * @param {String} env
   */
  static setEnv(env) {
    BaseServer.ENV = env;
  }

  _serverType = "unknown";

  includes = [];
  excludes = [];

  /**
   * @param type server type, like oss or ftp
   */
  constructor(type) {
    if (type) {
      this._serverType = type
    }
  }

  /**
   * where print file will go
   * @param from file local path
   * @param to remote server path
   */
  traceLog(from, to) {
    const prefix = BaseServer.isDebug
      ? `[${this._serverType} Debug]:`
      : `[${this._serverType} Upload]:`
    const filename = path.basename(from);
    console.log(prefix, filename, " -> ", to);
  }

  put() {
    throw new Error("[BaseServer Error]: Sub Server must implement put method");
  }

  setUploadRules(includes = [], excludes = []) {
    if (Array.isArray(includes)) {
      this.includes = includes;
    }
    if (Array.isArray(excludes)) {
      this.excludes = excludes;
    }
  }

  /**
   * whether the file can be uploaded under the rules
   * @param filePath file path
   * @return {Boolean}
   */
  canUpload(filePath) {
    const extname = path.extname(filePath);
    if (this.includes.length) {
      return this.includes.includes(extname);
    }
    if (this.excludes.length) {
      return !this.excludes.includes(extname);
    }
    return true;
  }
}
