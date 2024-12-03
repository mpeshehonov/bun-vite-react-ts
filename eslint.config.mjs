import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,ts,tsx,mjs,cjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          singleQuote: true,
          semi: true,
          useTabs: false,
          importOrder: [
            '^react',
            '<THIRD_PARTY_MODULES>',
            '^package.json$',
            '^(?!src)(.*)\\.css$',
            '^src/styles/(.*)\\.css$',
            '^@[./]',
          ],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          endOfLine: 'auto',
          plugins: ['@trivago/prettier-plugin-sort-imports'],
          printWidth: 80,
          overrides: [
            {
              files: ['*.json', '*.md', '*.scss', '*.yml', '*.yaml'],
              options: {
                singleQuote: false,
              },
            },
            {
              files: ['*.ts', '*.tsx'],
              options: {
                arrowParens: 'always',
              },
            },
          ],
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      curly: ['error', 'all'],
      'no-case-declarations': 'off',
      'no-empty-pattern': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'eol-last': ['error', 'always'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    ignores: ['dist'],
  },
];
