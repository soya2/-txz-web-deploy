import path from "node:path";
import OSS from "ali-oss";
import {BaseServer} from "./base.js";
import {isFunction} from "ali-oss/lib/common/utils/isFunction.js";

export class OssServer extends BaseServer {
  client = null;
  remotePath = "";
  /**
   * @type {UploadFunction | undefined}
   */
  beforeUpload = undefined;

  /**
   * init oss server
   * @param {OssConfiguration=} config oss server config
   */
  constructor(config) {
    super("OSS")
    if (config !== undefined) {
      this.remotePath = config.uploadPath;
      this.client = new OSS(config.servers);
      this.setUploadRules(config.includes, config.excludes);
      this.beforeUpload = config.beforeUpload;
    }
  }

  /**
   * Transfer the file to the specified path through the OSS client,
   * and the prefix path in the configuration will be spliced into the relative path for uploading.
   * @param {String} filePath local file absolute path
   * @param {String} relativePath remote server relative path
   */
  async put(filePath, relativePath) {
    if (!this.client) {
      return;
    }
    if (!this.canUpload(filePath)) {
      return;
    }
    let localRelativePath = relativePath;
    if (isFunction(this.beforeUpload)) {
      localRelativePath = this.beforeUpload({
        env: BaseServer.ENV,
        extname: path.extname(filePath),
        filePath,
        relativePath,
      })
      if (typeof localRelativePath !== "string") {
        throw new Error("[OSS Error]: if ossConfig.beforeUpload exists, then it must be a function and return a string");
      }
    }
    const remote = path.join(this.remotePath, localRelativePath).replace(/\\/g, "/");
    if (BaseServer.isDebug) {
      this.traceLog(filePath, remote);
      return;
    }
    await this.client.put(remote, filePath);
    this.traceLog(filePath, remote);
  }
}
