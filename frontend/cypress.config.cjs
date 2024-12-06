const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: [
      // E2E-filer Cypress letar efter som standard
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      // Tillägg för Cucumber
      "cypress/e2e/**/*.feature",
    ],
  },
  env: {
    API_URL: "http://localhost:3000/api",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // Lägg till denna konfiguration
      webpackConfig: {
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
    },
  },
});
