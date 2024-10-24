describe("View destination info", () => {
    beforeEach(() => {
      cy.login("kaybeek990@gmail.com", "Password#1234");
    });
    it("should allow display home page", () => {
        cy.url().should("include", "/home");
    });

    // it("Should show the destination card", () => {
    //     cy.get(`[data-testid="destinationCard"]`).should("exist");
    // });

    // it("should display destination name", () => {
    //     cy.get(`[data-testid="destinationName"]`).should("exist");
    // });
    // it("should display destination description", () => {
    //     cy.get(`[data-testid="destinationDescription"]`).should("exist");
    // });
    // it("should display destination image", () => {
    //     cy.get(`[data-testid="destinationImage"]`).should("exist");
    // });
    // it("should view more destination info", () => {
    //     cy.get(`[data-testid="destinationImage"]`).eq(1).click({ force: true });
    //     cy.wait(3000);
    //     cy.get(`[data-testid="destinationInfo"]`).should("exist");
    // });
    
    
    
});