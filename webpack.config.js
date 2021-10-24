const webpack = require("webpack");
const path = require("path");

const config = {
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /(\.css$)/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=100000",
      },
    ],
  },
  resolveLoader: {
    modules: [
      "node_modules",
      path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules"),
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules"),
    ],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    port: 9950,
    contentBase: "./output",
    writeToDisk: true,
  },
};

module.exports = config;
