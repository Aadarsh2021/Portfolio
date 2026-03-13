const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const isProduction = process.env.NODE_ENV === 'production';

      // Optimization configuration
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        minimize: isProduction,
        minimizer: isProduction ? [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
              output: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ] : [],
        splitChunks: isProduction ? {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '~',
          enforceSizeThreshold: 50000,
          cacheGroups: {
            three: {
              test: /[\\/]node_modules[\\/]three[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 20,
            },
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
            },
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        } : false,
      };

      // Add compression plugin only in production
      if (isProduction) {
        webpackConfig.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );
      }

      // Add source map loader configuration - skip in production for speed
      if (!isProduction) {
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
      }

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
            warning.module.resource &&
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