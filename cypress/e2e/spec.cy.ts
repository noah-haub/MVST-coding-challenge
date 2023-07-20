describe("Authentication", () => {
    it("Signs in the user via github and signs them back out", () => {
        //@ts-ignore
        cy.signInWithGitHub();
        //@ts-ignore
        cy.signOut();
    });
});

describe("User", () => {
    it("Signs in the user via github and checks to see if user information in settings is fetched", () => {
        //@ts-ignore
        cy.signInWithGitHub();

        cy.visit("/settings");

        cy.get('[data-test="username-text"]').should("not.be.empty");
        cy.get('[data-test="displayname-text"]').should("not.be.empty");
    });

    it("Signs in the user via github and checks to see if repositories could be fetched", () => {
        //@ts-ignore
        cy.signInWithGitHub();

        cy.visit("/repos");

        cy.get('[data-test="repo-table-row"]').should("exist");
    });
});
