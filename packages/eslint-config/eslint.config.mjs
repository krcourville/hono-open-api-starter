import antfu from '@antfu/eslint-config';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 */
export default antfu(
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
  {
    rules: {
      'no-console': ['warn'],
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
    },

  },
  comments.recommended,
  {
    rules: {
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
      '@eslint-community/eslint-comments/require-description': ['error', { ignore: [] }],
    },
  },
);
