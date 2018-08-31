const merge = require('webpack-merge');
const path = require('path');
const common = require('./common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../public/'),
    port: 3000,
    historyApiFallback: true,
  },
});