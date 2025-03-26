module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // tsconfig 경로 설정
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error", // Prettier 규칙을 ESLint로 에러로 처리
    "import/prefer-default-export": "off", // named export 허용
    "react/react-in-jsx-scope": "off", // React 17 이상에서는 React import 불필요
    "react/jsx-props-no-spreading": "off", // JSX에서 props spread 허용
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
