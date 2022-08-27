module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      "presets": ["@babel/preset-react"]
    }
  },
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended', "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
    page: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    // 'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/extensions': 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function"
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url', 'object-assign'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: [
        ["@/components", "./src/components/*"],
        ["@/pages", "./src/pages/*"]
      ]
    },
  },
};