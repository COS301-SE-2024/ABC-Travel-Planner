describe("Search", () => {
  beforeEach(() => {
    cy.login("kabza@gmail.com", "Password#1234");
  });

  it("Should display Search page", () => {
    cy.visit("/search");
    cy.get(`[data-testid="searchContainer"]`).should("exist");
  });

  it("Should display search options", () => {
    cy.visit("/search");
    cy.get(`[data-testid="searchOptions"]`).should("exist");
  });
  it("Should display search input and should be able to type", () => {
    cy.visit("/search");
    cy.get(`[data-testid="flightsButton"]`).click({ force: true });
    cy.get(`[data-testid="searchInput"]`).should("exist");
    cy.get(`[data-testid="searchButton"]`).should("exist");
    cy.get(`[data-testid="searchInput"]`).type("South Africa");
    cy.get(`[data-testid="searchButton"]`).click({ force: true });
  });
});
