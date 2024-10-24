describe("Create an itinerary", () => {
  beforeEach(() => {
    cy.login("kaybeek990@gmail.com", "Password#1234");
  });
  it("should display the itinerary page", () => {
    cy.visit("/itinerary");
    cy.url().should("include", "/itinerary");
  });
  it("should display the itinerary page", () => {
    cy.visit("/itinerary");
    cy.get(`[data-testid="itinerariesTitle"]`).should("exist");
    cy.get(`[data-testid="itinerariesTitle"]`).should(
      "contain",
      "My Itineraries"
    );
    cy.get(`[data-testid="addItineraryButton"]`).should("exist");
  });
  // it("should allow user to add a new itinerary", () => {
  //   cy.visit("/itinerary");
  //   cy.get(`[data-testid="addItineraryButton"]`).click({ force: true });
  //   cy.get(`[data-testid="ItineraryForm"]`).should("exist");
  //   cy.get(`[data-testid="itineraryNameInput"]`).type("My first itinerary");
  //   cy.get(`[data-testid="locationInput"]`).type("USA");
  //   cy.get(`[data-testid="addItinerarySubmit"]`).click({ force: true });
  // });
});
