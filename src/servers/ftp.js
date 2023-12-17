import path from "node:path";
import SFTP from "ssh2-sftp-client";
import {BaseServer} from "./base.js";
import {decrypt} from "../utils/crypto.js";

export class FTPServer extends BaseServer {
  /**
   * @type {FtpServers | null}
   */
  config = null;
  client = null;
  isConnect = false;

  /**
   * init ftp server, use key decrypt server config
   * @param {FtpServers} config encrypt server config
   * @param {String} password decrypt key
   */
  constructor(config, password) {
    super("FTP");
    this.config = this.decryptConfig(config, password);
    this.client = new SFTP();
  }

  /**
   * init multiple ftp servers
   * @param {FtpConfiguration | undefined} config encrypt server config
   * @param {String} env env
   * @param {String} password decrypt key
   * @returns {FTPServer[]} ftp servers list
   */
  static createClients(config, env, password) {
    const list = [];
    if (config === undefined || config.servers === null) {
      return list;
    }
    for (const server of config.servers[env]) {
      const client = new FTPServer(server, password);
      client.setUploadRules(config.includes, config.excludes);
      list.push(client);
    }
    return list;
  }

  /**
   * decrypt server config
   * @param {FtpServers} encryptConfig encrypt server config
   * @param {String} password decrypt key
   * @returns {FtpServers | null} server config
   */
  decryptConfig(encryptConfig, password) {
    try {
      if (!password || password.trim() === "") {
        console.warn("[FTP Warning]: key does not exits，will not to decrypt and connect server");
        return null;
      }
      if (!encryptConfig) {
        console.error("[FTP Error]: ftp config does not exits");
        return null;
      }
      for (const [key, val] of Object.entries(encryptConfig)) {
        encryptConfig[key] = Array.isArray(val)
          ? val.map((encryptString) => decrypt(encryptString, password))
          : decrypt(val, password);
      }
      return encryptConfig;
    } catch (e) {
      throw new Error("[FTP Error]: parsing ftp config failed");
    }
  }

  /**
   * Transfer the file to the specified path through the FTP client,
   * and the prefix path in the configuration will be spliced into the relative path for uploading.
   * @param {String} filePath local file absolute path
   * @param {String} relativePath remote server relative path
   */
  async put(filePath, relativePath) {
    if (this.config === null) return;
    if (!this.canUpload(filePath)) {
      return;
    }
    for (const currentPath of this.config.remote_path) {
      const remotePath = path.join(currentPath, relativePath).replace(/\\/g, "/");
      if (BaseServer.isDebug) {
        this.traceLog(filePath, remotePath)
        continue;
      }
      const remoteDir = path.dirname(remotePath);
      if (!this.isConnect) {
        await this.client.connect(this.config);
        this.isConnect = true;
      }
      const isDirExists = await this.client.exists(remoteDir);
      if (!isDirExists) {
        await this.client.mkdir(remoteDir, true);
      }
      await this.client
        .put(filePath, remotePath, {
          flags: "w",
          encoding: null,
          mode: 0o755,
          autoClose: true,
        })
        .catch((e) => {
          console.log(e);
          throw Error(`upload ${this.config.host} failed, ${filePath}`);
        });

      this.traceLog(filePath, remotePath)
    }
  }
}
