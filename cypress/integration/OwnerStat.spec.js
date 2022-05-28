describe("View Stats", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("#login-username").type("deepan");
    cy.get("#login-password").type("Csit12345");

    cy.get("button").click();

    cy.url().should("include", "/dashboard");
  });

  it("View Stats", (done) => {
    cy.log(Cypress.env("VITE_REST_URL"));
    cy.visit("http://localhost:3000/statistics");

    cy.get("th").first().should("have.text", "Email");
    cy.get("th:nth-child(2)").should("have.text", "Average Spending");
    cy.get("th:nth-child(3)").should("have.text", "Favorite Dish/Drink");
    cy.get("th").last().should("have.text", "Last Visited");

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
        cy.get("td:nth-child(3)")
          .invoke("text")
          .should("match", /[\d]{2,3}%$/);
        cy.get("td")
          .last()
          .invoke("text")
          .should("match", /[\d]{1,2}-[\d]{1,2}-[\d]{4}/);
        done();
      });
  });
});
