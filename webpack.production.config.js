const path = require("path");
const Uglify = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

const SRC_DIR = path.resolve(__dirname, "client");
const BUILD_DIR = path.resolve(__dirname, "build");

module.exports = {
  entry: path.resolve(SRC_DIR, "index.js"),
  mode: "production",
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: "file-loader",
        options: {}
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader"
      }
    ]
  },
  resolve: {
    alias: { "~": SRC_DIR }
  },
  plugins: [
    new Uglify(),
      new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};
