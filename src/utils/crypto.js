import {createHash, createCipheriv, createDecipheriv} from "node:crypto";

const algorithm = "aes-256-cbc";

/**
 *  encrypt string data
 * @param {String} data data to be encrypted
 * @param {String} key key, used for both encryption and decryption
 * @returns {string}
 */
export function encrypt(data, key) {
  const keyHash = createHash("sha256").update(key).digest();
  const cipher = createCipheriv(algorithm, keyHash.subarray(0, 32), keyHash.subarray(0, 16));
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

/**
 *  decrypt data
 * @param {String} encryptedData encrypted data
 * @param {String} key key, used for both encryption and decryption
 * @returns {string}
 */
export function decrypt(encryptedData, key) {
  const keyHash = createHash("sha256").update(key).digest();
  const decipher = createDecipheriv(algorithm, keyHash.subarray(0, 32), keyHash.subarray(0, 16));
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
}
