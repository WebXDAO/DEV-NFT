module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'next'],
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    "semi": 0
  }
}
