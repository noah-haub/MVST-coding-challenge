//@ts-ignore
Cypress.Commands.add("signInWithGitHub", () => {
    cy.log("Signin in with GitHub");

    cy.visit("/signin");
    cy.get('[data-test="github-auth-button"]').click();

    cy.origin("https://github.com/", () => {
        cy.url().should("contain", "https://github.com");
        cy.log("On site");
        cy.get("#login_field").type(Cypress.env('GITHUB_AUTH_EMAIL'));
        cy.get("#password").type(Cypress.env('GITHUB_AUTH_PASSWORD'), { log: false });
        cy.get('[data-signin-label="Sign in"]').click();
    });

    cy.url().should("contain", "/repos");
});

//@ts-ignore
Cypress.Commands.add("signOut", () => {
    cy.log("Sign out of application");

    cy.visit("/settings");
    cy.get('[data-test="signout-button"]').click();

    cy.get('[data-test="confirm-button"]').click();

    cy.visit("/signin");

    cy.url().should("contain", "/signin");
});
