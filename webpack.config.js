const webpack = require("webpack");
const path = require("path");
const package = require("./package.json");

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD", { encoding: "utf-8" })
  .trim();

//`/*! mobile-console-logger <%= pkg.version %> (${commitHash}) | https://github.com/saffari-m/mobile-console-logger */`

const config = {
  // Basic configuration
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
const cjs = Object.assign({}, config, {
  output: {
    path: path.resolve("dist"),
    filename: "react-mobile-console-logger.cjs.js",
  },
});
const commonjs2 = Object.assign({}, config, {
  output: {
    path: path.resolve("dist"),
    filename: "react-mobile-console-logger.js",
    libraryTarget: "commonjs2",
    clean: true,
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  // externals: {
  //   react: "commonjs react",
  //   "react-dom": "commonjs react-dom",
  // },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `/*! ${package.name} ${package.version}  (${commitHash}) | https://github.com/saffari-m/react-console-logger */`,
    }),
  ],
});

module.exports = [commonjs2];
