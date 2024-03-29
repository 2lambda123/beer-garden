const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const proxyHost = 'localhost';
const proxyPort = '2338';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    // Uncomment this to allow external (non-localhost) connections
    // host: '0.0.0.0',
    //port: 8081,

    /// This seemed to cause issues with the live reloading
    disableHostCheck: true,

    // Compress responses with gzip
    compress: true,

    // Disable serving non-webpack generated assets
    contentBase: false,
    publicPath: '/',

    // Control the verbosity
    stats: 'minimal',

    proxy: [
      {
        context: ['/api', '/config', '/login', '/logout', '/version'],
        target: `http://${proxyHost}:${proxyPort}/`,
      },
      {
        context: ['/api/v1/socket/events'],
        target: `ws://${proxyHost}:${proxyPort}/`,
        ws: true,
      },
    ],
  },
});
