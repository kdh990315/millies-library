import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier'; // Prettier와 ESLint 충돌 방지
import pluginPrettier from 'eslint-plugin-prettier'; // Prettier를 ESLint에 통합

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      'no-undef': 'error',
      curly: 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-var': 'error',
      'prettier/prettier': 'error',
      'linebrack-style': ['error', 'unix'],
    },
  },
  prettierConfig, // Prettier와 충돌하는 ESLint 규칙 비활성화
];
