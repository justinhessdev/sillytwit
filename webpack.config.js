var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack')
var plugins = [];

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './js/client.js',
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    plugins: [
      new webpack.EnvironmentPlugin([
        'NODE_ENV',
        'REACT_APP_APPFIGURES_URL',
        'MY_URL'
      ]),
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
      })
    ]
  }
};﻿
