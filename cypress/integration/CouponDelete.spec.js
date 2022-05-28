describe("Delete a coupon", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("#login-username").type("Dishon");
    cy.get("#login-password").type("1234");

    cy.get("button").click();

    cy.url().should("include", "/dashboard");
  });

  it("Delete coupon", () => {
    cy.visit("http://localhost:3000/managecoupon");

    cy.get("table").find("tbody > tr").first().click();
    cy.get("button").contains("Remove").click();
    cy.get("button").contains("Delete").click();

    cy.contains("Successfully removed coupon").should("exist");
  });
});
