/** @format */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['react-app', 'react-app/jest', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'semistandard'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/setupTests.ts', '**/*.test.*', '**/AgoraVideoModal.tsx', '**/ProfileSettingPanel.tsx'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': 'off',
    'multiline-ternary': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
};
