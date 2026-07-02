const babelParser = require("@babel/eslint-parser");
const prettierConfig = require("eslint-config-prettier");
const vuePlugin = require("eslint-plugin-vue");
const vueParser = require("vue-eslint-parser");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  ...vuePlugin.configs["flat/essential"],
  {
    files: ["src/**/*.{js,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        navigator: "readonly",
        requestAnimationFrame: "readonly",
        window: "readonly",
      },
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      "camelcase": "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
      "vue/no-unused-vars": "off",
      "vue/no-use-v-if-with-v-for": "off",
      ...prettierConfig.rules,
    },
  },
];
