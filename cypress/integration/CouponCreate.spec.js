describe("Create a coupon", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("#login-username").type("Dishon");
    cy.get("#login-password").type("1234");

    cy.get("button").click();

    cy.url().should("include", "/dashboard");
  });

  it("Create coupon", () => {
    cy.visit("http://localhost:3000/managecoupon");

    cy.contains("Add").click();
    cy.chance("string", { length: 10 }).then((code) => {
      cy.get("input").first().type(code);
    });
    cy.chance("integer", { min: 1, max: 100 }).then((integer) => {
      cy.get('input[type="number"]').type(integer);
    });
    cy.chance("year", { string: true }).then((year) => {
      cy.chance("integer", { min: 1, max: 12 }).then((month) => {
        if (month < 10) {
          month = `0${month}`;
        }
        cy.chance("integer", { min: 1, max: 27 }).then((day) => {
          if (day < 10) {
            day = `0${day}`;
          }
          cy.get('input[type="date"]').type(`${year}-${month}-${day}`);
          cy.get("button").contains("Add Coupon").click();
          cy.contains("Successfully created").should("exist");
        });
      });
    });
  });
});
