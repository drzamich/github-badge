module.exports = {
  extends: ["airbnb-typescript", "plugin:styled-components-a11y/recommended"],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    "styled-components-a11y"
  ],
  ignorePatterns: ["build/**", ".eslintrc.js"],
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "max-len": [1, 120],
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-unused-expressions": [2, {allowShortCircuit: true}],
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
  },
}
