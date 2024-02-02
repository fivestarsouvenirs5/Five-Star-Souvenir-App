// webpack.config.js

module.exports = {
    externals: {
      // Example: Exclude 'buffer', 'fs', 'https', 'http', 'net'
      'node:buffer': 'buffer',
      'node:fs': 'fs',
      'node:https': 'https',
      'node:http': 'http',
      'node:net': 'net'
    }
  };
  