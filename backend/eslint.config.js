// ESLint Flat Config (novo padrão)
// Configuração simples para Node.js

import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],

    // Ambiente Node.js
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly"
      }
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "semi": ["error", "always"],
      "no-useless-assignment": "off",
      "quotes": "off"
    }
  }
];
