const path = require('path');
// const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
// const plugins = [];

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
    // plugins: [
    //   new webpack.DefinePlugin({
    //     'process.env.REACT_APP_APPFIGURES_URL': JSON.stringify(process.env.REACT_APP_APPFIGURES_URL),
    //   }),
    // ],
  },
};
// the plugins array does not do anything.. i define the URL in package.json script...
// need to find a better way to hide the URL
