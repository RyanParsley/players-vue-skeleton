describe("Home Page", () => {
  it("Visits the landing page", () => {
    cy.visit("/");
    cy.contains("Log in");
    cy.contains("Register");
  });
});
