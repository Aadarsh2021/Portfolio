module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for @mediapipe
      if (webpackConfig.module && webpackConfig.module.rules) {
        webpackConfig.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules\/@mediapipe/,
          type: 'javascript/auto',
        });
      }

      // Configure webpack to ignore source map warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/@mediapipe/,
        },
        /Failed to parse source map/,
      ];

      return webpackConfig;
    },
  },
}; 