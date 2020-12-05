module.exports = {
  extends: ["airbnb-typescript"],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
  }
}
