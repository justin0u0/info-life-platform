
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "semi": [2, "always"],
    "vue/html-self-closing": "off",
    'no-console': 'off',
    'space-before-function-paren': [ 'error', 'never' ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'max-len': 'off',
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-param-reassign": [ "error", { "props": false } ],
    "camelcase": [ "error", { "properties": "never", "ignoreDestructuring": true } ],
    "no-underscore-dangle": [ "error", { "allow": [ "_id" ] } ]
  },
  settings: {
    'import/core-modules': ['vue', 'vuex'] // these modules are included in nuxt.js
  }
};
