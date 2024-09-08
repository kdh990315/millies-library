import globals from 'globals'
import pluginJs from '@eslint/js'
// import prettierConfig from "eslint-config-prettier"; // Prettier와 ESLint 충돌 방지
// import pluginPrettier from 'eslint-plugin-prettier' // Prettier를 ESLint에 통합

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      // prettier: pluginPrettier,
    },
    rules: {
      // Prettier 규칙을 ESLint로 실행
      'prettier/prettier': 'error',
    },
  },
  // prettierConfig // Prettier와 충돌하는 ESLint 규칙 비활성화
]
