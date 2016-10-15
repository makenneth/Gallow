var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env":{
        "NODE_ENV": JSON.stringify("development"),
        "WS_URL": JSON.stringify("ws://localhost:8080"),
        "__DEVTOOLS__": true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ["babel", "eslint-loader"]
    }]
  },
  devtool: 'inline-source-map',
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules"
    ],
    extensions: ["", ".js", ".jsx"]
  }
}