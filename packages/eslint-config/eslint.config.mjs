import antfu from '@antfu/eslint-config';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import turboPlugin from 'eslint-plugin-turbo';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 */
export default antfu(
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
  comments.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      // 'no-console': ['warn', { allow: [''] }],
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
    },
  },
);
