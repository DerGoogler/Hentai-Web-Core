const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const FsWebpackPlugin = require("fs-webpack-plugin");

const config = {
  entry: ["react-hot-loader/patch", "./src/index.tsx", "./src/native/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "native",
  },
  plugins: [
    /*new HtmlWebpackPlugin({
      template: "src/templates/index.html",
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /(d)?\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /(\.css$)/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
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
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
  devServer: {
    port: 9950,
    contentBase: "./output",
    writeToDisk: true,
  },
};

module.exports = config;
