import { baseConfig } from './base-config.mjs';

/**
 * Common ESLint configuration for all packages.
 */
export const packageConfig = baseConfig([
  {
    // make jsdoc more strict on shared packages
    rules: {
      'jsdoc/require-jsdoc': ['warn', {
        publicOnly: true,
      }],
      'jsdoc/require-description': ['warn'],
    },
  },
]);
