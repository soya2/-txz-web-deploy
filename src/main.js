import Path from "node:path";
import {OssServer} from "./servers/oss.js";
import {FTPServer} from "./servers/ftp.js";
import {Config} from "./config/Config.js";
import {readFileList} from "./utils/file.js";

const [_, __, ENV, PASSWORD] = process.argv;

/**
 * upload file
 * @param {String[]} fileList file local path list
 * @param {Config} config config instance
 */
async function uploadFiles(fileList = [], config) {
  const {workspace, ossConfig, ftpConfig} = config;
  const ftpList = FTPServer.createClients(ftpConfig, config.env(), PASSWORD);
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

async function main() {
  try {
    const userConfig = await Config.getConfig();
    const deployConfig = new Config(userConfig);
    ENV && deployConfig.setEnv(ENV);
    const start = Date.now();
    console.log("workspace is " + deployConfig.workspace);
    const fileList = await readFileList(deployConfig.workspace);
    await uploadFiles(fileList, deployConfig);
    console.log("deploy success, duration：" + (Date.now() - start) / 1000 + "s");
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

main().then();
