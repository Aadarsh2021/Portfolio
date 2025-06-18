module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Exclude node_modules from source-map-loader
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOfRule) => {
            if (
              oneOfRule.loader &&
              oneOfRule.loader.includes('source-map-loader')
            ) {
              oneOfRule.exclude = /node_modules/;
            }
          });
        }
      });

      // (Keep ignoreWarnings as a fallback)
      webpackConfig.ignoreWarnings = [
        (warning) =>
          warning.message &&
          warning.message.includes('Failed to parse source map') &&
          warning.module &&
          warning.module.resource &&
          warning.module.resource.includes('node_modules')
      ];

      return webpackConfig;
    }
  }
}; 