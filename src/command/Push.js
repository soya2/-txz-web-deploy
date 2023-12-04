import Path from "node:path";
import {Command} from "./Command.js";
import {Config} from "../config/Config.js";
import {readFileList} from "../utils/file.js";
import {FTPServer} from "../servers/ftp.js";
import {OssServer} from "../servers/oss.js";

export class PushCommand extends Command {
  env = undefined;
  password = undefined;

  /**
   * @param {String} env
   * @param {String} password
   */
  constructor(env, password) {
    super();
    this.env = env;
    this.password = password;
  }

  async run() {
    const userConfig = await Config.getConfig();
    const deployConfig = new Config(userConfig);
    this.env && deployConfig.setEnv(this.env);
    const start = Date.now();
    console.log("workspace is " + deployConfig.workspace);
    const fileList = await readFileList(deployConfig.workspace);
    await this.uploadFiles(fileList, deployConfig);
    console.log("deploy success, duration：" + (Date.now() - start) / 1000 + "s");
  }


  /**
   * upload file
   * @param {String[]} fileList file local path list
   * @param {Config} config config instance
   */
  async uploadFiles(fileList = [], config) {
    const {workspace, ossConfig, ftpConfig} = config;
    const ftpList = FTPServer.createClients(ftpConfig, config.env(), this.password);
    const oss = new OssServer(ossConfig);
    const pushQueue = [];
    for (const file of fileList) {
      const relativePath = Path.relative(workspace, file).replace(/\\/g, "/");
      pushQueue.push(oss.put(file, relativePath));
      for (const ftp of ftpList) {
        pushQueue.push(ftp.put(file, relativePath));
      }
    }
    await Promise.all(pushQueue);
  }
}