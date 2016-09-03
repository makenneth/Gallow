var path = require('path')

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      ignore: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react", "stage-0"]
      }
    }]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
}