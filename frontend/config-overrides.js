const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
  };
  
  return config;
};