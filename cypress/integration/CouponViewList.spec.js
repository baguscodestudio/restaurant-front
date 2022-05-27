describe("View Coupon List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("#login-username").type("Dishon");
    cy.get("#login-password").type("1234");

    cy.get("button").click();

    cy.url().should("include", "/dashboard");
  });

  it("View coupon list", (done) => {
    cy.log(Cypress.env("VITE_REST_URL"));
    cy.visit("http://localhost:3000/managecoupon");

    cy.get("th").first().should("have.text", "Coupon");
    cy.get("th:nth-child(2)").should("have.text", "Discount");
    cy.get("th").last().should("have.text", "Expire");

    cy.once("fail", () => {
      done();
    });

    cy.get("tbody>tr")
      .first()
      .then(() => {
        cy.get("td")
          .first()
          .invoke("text")
          .should("match", /^[^\n ]*$/);
        cy.get("td:nth-child(2)")
          .invoke("text")
          .should("match", /[\d]{2,3}%$/);
        cy.get("td")
          .last()
          .invoke("text")
          .should("match", /[\d]{1,2}-[\d]{1,2}-[\d]{4}/);
      });
  });
});
