module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // For TypeScript support, if needed
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  collectCoverage: true,
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Adjust the glob pattern based on your folder structure
    "!src/index.js", // Exclude entry points or specific files if needed
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/reportWebVitals.ts",
    "<rootDir>/src/setupTests.ts",
    "<rootDir>/src/react-app-env.d.ts",
    "<rootDir>/src/hooks/",
    "<rootDir>/src/index.ts",
  ],
};
