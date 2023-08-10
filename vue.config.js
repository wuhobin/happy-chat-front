const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8889, // 端口号
    open: false, // 配置是否自动启动浏览器
    https: false, // 是否启用https
    proxy: {
      //代理
      "/api": {
        target: "http://127.0.0.1:8081",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
  configureWebpack: (config) => {},
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("static", resolve("src/static"))
      .set("utils", resolve("src/utils"));
  },
};
