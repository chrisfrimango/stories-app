const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { defineConfig } = require("cypress");
const coverage = require("@cypress/code-coverage/task");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/**/*.feature",
    ],
    async setupNodeEvents(on, config) {
      // Add cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Create bundler
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      // Setup code coverage
      coverage(on, config);

      return config;
    },
  },
  env: {
    API_URL: "http://localhost:3000/api",
    codeCoverage: {
      exclude: ["cypress/**/*.*", "src/main.tsx", "src/vite-env.d.ts"],
    },
    typescript: true,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.tsx",
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
