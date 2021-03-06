module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  // 用于测试服务器保存功能
  devServer: {
    proxy: "http://localhost:8000"
  },
  configureWebpack: {
    output: {
      libraryExport: "default"
    },
    resolve: {
      extensions: [".js", ".json", ".vue"]
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: "raw-loader"
        }
      ]
    }
  }
};
