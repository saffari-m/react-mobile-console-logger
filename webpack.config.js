const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("./package.json");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD", { encoding: "utf-8" })
  .trim();

//`/*! mobile-console-logger <%= pkg.version %> (${commitHash}) | https://github.com/saffari-m/mobile-console-logger */`

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    uniqueName: "Mobile_Console_Logger",
    // name: "react-emotion",
    chunkFilename: "[contenthash].js",
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.BannerPlugin({
      banner: `/*! ${package.name} ${package.version}  (${commitHash}) | https://github.com/saffari-m/mobile-console-logger */`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9000,
  },
};
