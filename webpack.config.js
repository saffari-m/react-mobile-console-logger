const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("./package.json");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD", { encoding: "utf-8" })
  .trim();

//`/*! mobile-console-logger <%= pkg.version %> (${commitHash}) | https://github.com/saffari-m/mobile-console-logger */`

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
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
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
    }),
    new webpack.BannerPlugin({
      banner: `/*! ${package.name} ${package.version}  (${commitHash}) | https://github.com/saffari-m/react-console-logger */`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: false,
    port: 9000,
  },
};
