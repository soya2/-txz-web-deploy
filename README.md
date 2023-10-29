# txz-web-deploy
**This package is under testing, please do not use it in production environment.**  

This npm package is for txz company and supports transferring files to ftp and ali-oss servers.
### install
```shell
npm install txz-web-deploy
```

### usage
A file named `txzDeploy.config.js` needs to exist in the running directory.  
The config file export default a javascript object.  

`txzDeploy.config.js` file look like this:
```javascript
export default {
  targetFolder: "dist",
  ossConfig: {
    beforeUpload: (arg) => {
      const {extname, env, relativePath} = arg;
      return extname === ".html" ? `${env}/${relativePath}` : relativePath;
    },
    servers: {
      region: "oss-region",
      accessKeyId: "your-access-key-id",
      accessKeySecret: "your-access-key-secret",
      bucket: "your-bucket-name",
      secure: true,
    },
  },
  ftpConfig: {
    includes: [".html"],
    servers: {
      test: [
        {
          host: "encrypt-host",
          port: "encrypt-port",
          username: "encrypt-username",
          password: "encrypt-password",
          remote_path: ["encrypt-remote-path"],
        },
      ],
    },
  },
}
```
run command, your configuration will be merged with the default configuration.
```shell
txz-web-deploy <CUSTOM_ENV_NAME> <DECRYPT_KEY>
# the following command means to use the ftp server of the test environment
# and use"TEST_KEY" to decrypt configuration.
txz-web-deploy test TEST_KEY
```
If there is no problem with your configuration, then you will see the deployment process and results.

### configuration

+ **debug**:  
Boolean type, default is `false`, if set to `true`, the file will not be pushed to the server.
+ **targetFolder**:  
String type, default is `""`, and the workspace is the path of `targetFolder` relative to `__dirname`.
+ **ossConfig**  
Not required, if it doesn't exist, just a waring log will be printed to remind you.
  + **ossConfig.domain**:  
  Reserved key
  + **ossConfig.uploadPath**:  
  String type, default is `""`, files will be uploaded to this path of the server.
  + **ossConfig.excludes**:  
  Array<string> type, default is `[]`, file extname in this array will not be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if `ossConfig.includes` is set, this will be invalid.**
  + **ossConfig.includes**:  
  Array<string> type, default is `[]`, only file with extname in the array will be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if this is set, `ossConfig.excludes` will be invalid.**
  + **ossConfig.beforeUpload**:  
  If it exists, must be a function and return to string. Its arguments is an object containing `env`, `extname`, `filePath` and `relativePath`.
  + **ossConfig.servers**:  
  Default is `null`, if you want to use oss server, you must be set it.
    + **ossConfig.servers.region**: string type, oss-region.
    + **ossConfig.servers.accessKeyId**: string type, your-access-key-id.
    + **ossConfig.servers.accessKeySecret**: string type, your-access-key-secret.
    + **ossConfig.servers.bucket**: string type, your-bucket-name.
    + **ossConfig.servers.secure**: boolean type.
+ **ftpConfig**:  
Not required, if it doesn't exist, just a waring log will be printed to remind you.
  + **ftpConfig.excludes**:  
  Array<string> type, default is `[]`, file extname in this array will not be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if `ossConfig.includes` is set, this will be invalid.**
  + **ftpConfig.includes**:  
  Array<string> type, default is `[]`, only file with extname in the array will be uploaded. Extname needs to be prefixed with `.`, such as `[".html"]`. **if this is set, `ossConfig.excludes` will be invalid.**
  + **ftpConfig.servers**:  
  Default is `null`, if you want to use ftp server, you must be set it.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>**:  
    Key name is custom env name, such `test`, `pre-release` or `prod`. Run the command will use it. This value is an array, because an environment may have multiple servers.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>[index].host**: encrypt-host.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>[index].port**: encrypt-port.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>[index].username**: encrypt-username.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>[index].password**: encrypt-password.
    + **ftpConfig.servers.<CUSTOM_ENV_NAME>[index].remote_path**: is an array, encrypt-remote-path.  

All ftp servers config like `host`, `port` will be decrypted by `<DECRYPT_KEY>`, so we need to encrypt them first before writing the configuration file.

The encrypt algorithm is very simple, you can see the file `src/utils/crypto.js` in the source code. *Encrypt via the command line may be provided in the future.*
