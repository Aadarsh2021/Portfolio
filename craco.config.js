module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add source map loader configuration
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'source-map-loader',
          options: {
            filterSourceMappingUrl: (url, resourcePath) => {
              // Ignore source maps for @mediapipe packages
              if (/@mediapipe/.test(resourcePath)) {
                return false;
              }
              return true;
            }
          }
        }
      });

      // Add ignore warnings configuration
      webpackConfig.ignoreWarnings = [
        {
          module: /@mediapipe/,
        },
        {
          module: /tasks-vision/,
        },
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ];

      return webpackConfig;
    },
  },
}; 