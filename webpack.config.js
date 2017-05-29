const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const denv = () => new Dotenv({ path: './.env', safe: false });

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
  plugins: debug ? [
    denv(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ] : [
    denv(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

console.log('logging plugins: We should see process.env.REACT_APP_APPFIGURES_URL, process.env.NODE_ENV, process.env.FLAG');
console.log(module.exports.plugins);
