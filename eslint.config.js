const globals = require("globals");
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: { ...globals.node, ...globals.jest } },
    rules: { "no-unused-vars": "error", "no-undef": "error" },
  },
];
