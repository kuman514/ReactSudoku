import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: ['**/dist/', '**/node_modules/', '**/.yarn/', '**/*.{cjs,mjs}'],
  },
];
