import Path from "node:path";
import {readdir, stat} from "node:fs/promises";

/**
 * recursively obtain the absolute paths of all files under a folder path
 * @param {String} path target folder path
 * @param {String[]} [filesList=[]] list of paths to store during recursion
 * @returns {Promise<String[]>} all files absolute paths list
 */
export async function readFileList(path, filesList = []) {
  try {
    const files = await readdir(path).catch(() => {
      throw new Error("path does not exist");
    });
    for (const name of files) {
      const fileOrDir = Path.join(path, name);
      const status = await stat(fileOrDir);
      if (status.isDirectory()) {
        const subFileList = await readFileList(fileOrDir, filesList);
        filesList.concat(subFileList);
      } else {
        filesList.push(fileOrDir);
      }
    }
    return filesList;
  } catch (e) {
    throw new Error(e.message)
  }
}
