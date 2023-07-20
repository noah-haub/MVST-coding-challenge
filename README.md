## What is this?

This is GiddyHub. GiddyHub is a straightforward and lightweight utilization of the GitHub API. You can use it to log in with GitHub and check out and search through all your repositories.

It has been created as a small challenge in the application process of [MVST](https://www.mvst.co/home)

## How to run the web app

Here is a simple step-by-step guide on downloading and locally running GiddyHub.
1. Clone the repository
2. Install the packages with `npm install`
3. Run the app with `npm run dev`

Then you can open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to run the test suite

The test suite was built using [Cypress](https://www.cypress.io/) and this is how you run it locally.

1. Run the app with `npm run dev`
2. Open the `cypress.config.ts` in the root folder
3. Replace the `GITHUB_AUTH_EMAIL` and `GITHUB_AUTH_PASSWORD` env variables with the auth credentials you would like to use for testing.
4. Also make sure to replace the `baseUrl` with the URL your dev server is running on (Can be kept as http://localhost:3000 in most cases).
5. Now run the test suite with `npm run cypress`
6. Click on `E2E Testing`
7. Select `Chrome` and click on `Start E2E Testing in Chrome`
8. Select `Specs`in the sidebar of the newly opened Cypress browser window
9. Select the `spec.cy.ts`spec and let it run (For the authentication tests to succeed you will have to previously manually authorized GiddyHub access to your GitHub account)


## Future improvements

Future improvements to GiddyHub could be the ability...
- to view and edit your repository's files,
- to search for repositories not owned by the signed-in user,
- to edit the signed-in user's profile (Name, etc.)
