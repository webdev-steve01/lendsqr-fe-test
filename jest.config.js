// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(@hookform|react-hook-form|@testing-library|framer-motion)/)",
  ],
};

module.exports = createJestConfig(customJestConfig);
