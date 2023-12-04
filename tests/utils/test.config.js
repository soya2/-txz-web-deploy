export default {
  debug: true,
  targetFolder: "../utils/testFolder",
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
      test: [{
        host: "ea988c8d5188e177eaf49bb78e595074",
        port: "5d4b32be003a218d68c0139f47528d64",
        username: "13411b9daab0ec1d300ea64a87312086",
        password: "13411b9daab0ec1d300ea64a87312086",
        remote_path: ["72d8fe845fbc58f9db14881dbcd1a9b9"],
      }],
    },
  },
}
