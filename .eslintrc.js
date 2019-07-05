module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": ["error", 2], // 2 个空格缩进
    "object-curly-spacing": ["error", "always"], // 强制在花括号中使用一致的空格
    "beforeColon": false, // 禁止在对象字面量的键和冒号之间存在空格
    "align": "colon", // 属性以冒号为标准对齐
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
