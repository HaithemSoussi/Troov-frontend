import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default {
  parser: tsParser,
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  globals: globals.browser,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
