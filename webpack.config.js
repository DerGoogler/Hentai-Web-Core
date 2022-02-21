const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const config = {
  entry: {
    app: ["./src/index.tsx"],
    native: ["./src/native/export.js"],
  },
  output: {
    filename: "bundle/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "umd",
    assetModuleFilename: "files/[name].[ext]",
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
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle/[name].bundle.css",
    }),
    new MonacoWebpackPlugin({
      languages: ["javascript"],
    }),
  ],
  resolveLoader: {
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
  resolve: {
    modules: ["node_modules", path.join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@Builders": path.resolve(__dirname, "src/builders/index.ts"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Native": path.resolve(__dirname, "src/native"),
      "@Types": path.resolve(__dirname, "src/typings"),
      "@DataPacks": path.resolve(__dirname, "src/dataPacks"),
      "@Misc": path.resolve(__dirname, "src/misc"),
      "@Bootloader": path.resolve(__dirname, "src/index.tsx"),
      "@Styles": path.resolve(__dirname, "src/styles"),
      "@Strings": path.resolve(__dirname, "src/localization/index.ts"),
      "@Views": path.resolve(__dirname, "src/views/index.ts"),
    },
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
};

module.exports = config;
