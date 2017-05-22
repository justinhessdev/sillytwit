const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const plugins = [];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './js/client.js',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'client.min.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
    }),
  ],
};
