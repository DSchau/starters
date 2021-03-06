module.exports = {
  extends: ['react-app'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    __PATH_PREFIX__: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: '2018'
  },
}
