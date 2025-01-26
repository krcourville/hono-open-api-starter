import antfu from '@antfu/eslint-config';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsDoc from 'eslint-plugin-jsdoc';
import turboPlugin from 'eslint-plugin-turbo';

/**
 * Creates a base ESLint configuration, common the the entire repository.
 *
 * @param {import("eslint").Linter.Config[]} [configs] - Additional ESLint configurations to merge
 * @returns {import("eslint").Linter.Config} The merged ESLint configuration
 */
export function baseConfig(configs) {
  configs = configs ?? [];
  return antfu(
  // antfu configuration
    {
      type: 'app',
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
      ignores: ['**/migrations/*'],
    },
    // other configurations
    jsDoc.configs['flat/recommended/typescript'],
    comments.recommended,
    {
      plugins: {
        turbo: turboPlugin,
      },
      rules: {
        'antfu/no-top-level-await': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': ['error', {
          tsconfigRootDir: '.',
        }],
        'unicorn/filename-case': ['error', {
          case: 'kebabCase',
          ignore: ['.*\.md'],
        }],
        // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
        '@eslint-community/eslint-comments/require-description': ['error', { ignore: [] }],
        'no-console': ['warn', { allow: undefined }],

        // the typescript compiler handles this better
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'no-restricted-exports': ['error', {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        }],
      },
    },
    ...configs,
  );
}
