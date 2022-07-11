module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module'
  },
  rules: {
    'no-var': 2,
    'no-unused-vars': 1,
    'no-case-declarations': 0
  }
};
