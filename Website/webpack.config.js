const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const FsWebpackPlugin = require("fs-webpack-plugin");

const APP_DIR = path.resolve(__dirname, "./src");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

const config = {
  entry: {
    index: ["./src/index.tsx"],
    native: {
      import: "./src/native/export.js",
      dependOn: "index",
    },
    HWPlugin: {
      import: "./src/native/hwplugin/export.js",
      dependOn: "index",
    },
  },
  output: {
    filename: "bundles/[name].goocode",
    path: path.resolve(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "umd",
  },
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
        test: /\.yaml$/,
        use: "js-yaml-loader",
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
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: "url-loader?limit=100000&name=files/[name].[ext]",
      },
    ],
  },
  resolveLoader: {
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
  resolve: {
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@Builders": path.resolve(__dirname, "src/builders"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Native": path.resolve(__dirname, "src/native"),
      "@Types": path.resolve(__dirname, "src/typings"),
      "@DataPacks": path.resolve(__dirname, "src/dataPacks"),
      "@Misc": path.resolve(__dirname, "src/misc"),
      "@Bootloader": path.resolve(__dirname, "src/index.tsx"),
      "@Styles": path.resolve(__dirname, "src/styles"),
    },
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
};

module.exports = config;
