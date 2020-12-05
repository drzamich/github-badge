module.exports = {
  extends: ["airbnb-typescript"],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "max-len": [1, 120],
    "@typescript-eslint/no-unused-vars": 1
  }
}
