const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/globe.js"],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: false,
    hot: true,
    writeToDisk: true,
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|jpg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          outputPath: "./assets",
        },
      },
    ],
  },
  output: {
    filename: "generated_globe.js",
    path: path.resolve(__dirname, "dist"),
  },
};
