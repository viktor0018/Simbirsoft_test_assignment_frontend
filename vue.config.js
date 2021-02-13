module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v2/",
        pathRewrite: { "^/api": "" },
        logLevel: "debug",
      },
    },
  },
};
