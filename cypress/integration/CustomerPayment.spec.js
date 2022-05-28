describe("Customer Make Payment", () => {
  let table = 0;
  it(`Create Order`, () => {
    cy.chance("integer", { min: 1, max: 200 }).then((tablenum) => {
      table = tablenum;
      cy.visit("http://localhost:3000/order");
      cy.get('input[type="number"]').type(tablenum);
      cy.get("button").contains("Create Order").click();
      cy.contains("Menu List").should("exist");
      cy.get("#items-list > div")
        .its("length")
        .then((items) => {
          cy.chance("integer", { min: 1, max: items }).then((loop_items) => {
            for (let i = 1; i <= loop_items; i++) {
              cy.chance("integer", { min: 1, max: 10 }).then((amount) => {
                cy.get(`#items-list > div:nth-child(${i})`)
                  .find('input[type="text"]')
                  .type(amount);
                cy.get(`#items-list > div:nth-child(${i})`)
                  .contains("Add to cart")
                  .click();
              });
            }
            cy.contains("Create Order").click();
          });
        });
    });
  });

  it("Make Payment", () => {
    cy.visit("http://localhost:3000/order");
    cy.get('input[type="number"]').type(table);
    cy.get("button").contains("Check Order").click();
    cy.get("button").should("exist");
    cy.get("button").click();
    cy.contains("Table Number").should("exist");
    cy.contains("Payment Total").should("exist");
    cy.chance("email", { domain: "gmail.com" }).then((email) => {
      cy.chance("cc").then((creditcard) => {
        cy.get("#card-info").type(creditcard);
        cy.get("#email").type(email);
      });
    });
    cy.get('button[type="submit"]').click();
  });
});
