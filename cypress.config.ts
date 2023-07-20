import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:3000",
    },
    env: {
        GITHUB_AUTH_EMAIL: "test@gmail.com",
        GITHUB_AUTH_PASSWORD: "password1234",

        SEARCH_TERM: "helloworld",
    },
});
