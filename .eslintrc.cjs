module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier', 'svelte3', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
