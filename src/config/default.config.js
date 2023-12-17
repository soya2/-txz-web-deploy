/**
 * @typedef UploadFunctionParams
 * @property {string} env - target environment name
 * @property {string} extname - current upload file extname
 * @property {string} filepath - local file absolute path
 * @property {string} relativePath - remote server relative path
 */

/**
 * @typedef UploadFunction
 * @param {UploadFunctionParams} params
 * @return {string}
 */

/**
 * @typedef OssServers
 * @property {string} region - string type, oss-region.
 * @property {string} accessKeyId - string type, your-access-key-id.
 * @property {string} accessKeySecret - string type, your-access-key-secret.
 * @property {string} bucket - string type, your-bucket-name.
 * @property {boolean} secure - boolean type.
 */

/**
 * @typedef OssConfiguration
 * @property {string} domain - Reserved key
 * @property {string} uploadPath - String type, default is `""`, files will be uploaded to this path of the server.
 * @property {string[]} excludes - Array<string> type, default is `[]`, file extname in this array will not be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if `ossConfig.includes` is set, this will be invalid.**
 * @property {string[]} includes - Array<string> type, default is `[]`, only file with extname in the array will be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if this is set, `ossConfig.excludes` will be invalid.**
 * @property {UploadFunction} beforeUpload - If it exists, must be a function and return to string. Its arguments is an object containing `env`, `extname`, `filePath` and `relativePath`. The returned string will join with `ossConfig.uploadPath` as the final upload path. *Tip: This function will be called before checking includes and excludes.*
 * @property {null | OssServers} servers - Default is `null`, if you want to use oss server, you must be set it.
 */

/**
 * @typedef FtpServers
 * @property {string} host - encrypt-host.
 * @property {string} port - encrypt-port.
 * @property {string} username - encrypt-username.
 * @property {string} password - encrypt-password.
 * @property {string[]} remote_path - is an array, encrypt-remote-path.
 */

/**
 * @typedef FtpConfiguration
 * @property {string[]} excludes - Array<string> type, default is `[]`, file extname in this array will not be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if `ftpConfig.includes` is set, this will be invalid.**
 * @property {string[]} includes - Array<string> type, default is `[]`, only file with extname in the array will be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if this is set, `ftpConfig.excludes` will be invalid.**
 * @property {null | Object<string, FtpServers[]>} servers - Default is `null`, if you want to use ftp server, you must be set it.Key name is custom env name, such `test`, `pre-release` or `prod`. Run the command will use it. This value is an array, because an environment may have multiple servers.
 */

/**
 * @typedef TxzDeployConfiguration
 * @property {boolean} debug - default is `false`, if set to `true`, the file will not be pushed to the server.
 * @property {string} targetFolder - default is `""`, and the workspace is the path of `targetFolder` relative to `__dirname`.
 * @property {OssConfiguration} ossConfig - Not required, if it doesn't exist, just a waring log will be printed to remind you.
 * @property {FtpConfiguration} ftpConfig - Not required, if it doesn't exist, just a waring log will be printed to remind you.
 */

/**
 * default configuration
 * @type {TxzDeployConfiguration}
 */
const configuration = {
  debug: false,
  targetFolder: "",
  ossConfig: {
    domain: "",
    uploadPath: "",
    excludes: [],
    includes: [],
    beforeUpload: undefined,
    servers: null,
  },
  ftpConfig: {
    excludes: [],
    includes: [],
    servers: null,
  },
};

export default configuration;
