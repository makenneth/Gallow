var path = require('path')
var webpack = require("webpack")
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public", "js"),
    filename: "bundle.js"
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development'),
        'WS_URL': JSON.stringify('ws://localhost:8080')
      }
    })
  ],
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