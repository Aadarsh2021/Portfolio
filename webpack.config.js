const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
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
      }
    ]
  },
  ignoreWarnings: [
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
  ],
}; 