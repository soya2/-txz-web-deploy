export default {
  debug: true,
  targetFolder: "../utils/testFolder",
  ossConfig: {
    beforeUpload: (arg) => {
      const {extname, env, relativePath} = arg;
      return extname === ".html" ? `${env}/${relativePath}` : relativePath;
    },
    servers: {
      region: "",
      accessKeyId: "",
      accessKeySecret: "",
      bucket: "",
      secure: true,
    },
  },
  ftpConfig: {
    includes: [".html"],
    servers: {
      test: [],
    },
  },
}
