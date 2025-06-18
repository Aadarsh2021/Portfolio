const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules\/@mediapipe/,
        type: 'javascript/auto',
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules\/@mediapipe/,
    },
    /Failed to parse source map/,
  ],
}; 