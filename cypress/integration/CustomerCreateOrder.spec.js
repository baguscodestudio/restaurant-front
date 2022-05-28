describe("Customer Add Cart & Create Order", () => {
  it(`Create Order with Table Number`, () => {
    cy.chance("integer", { min: 1, max: 200 }).then((tablenum) => {
      cy.visit("http://localhost:3000/order");
      cy.get('input[type="number"]').type(tablenum);
      cy.get("button").contains("Create Order").click();
      cy.contains("Menu List").should("exist");
      cy.get("#items-list > div")
        .its("length")
        .then((items) => {
          cy.chance("integer", { min: 1, max: items }).then((loop_items) => {
            cy.chance("integer", { min: 1, max: loop_items }).then(
              (start_items) => {
                for (let i = start_items; i <= loop_items; i++) {
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
              }
            );
          });
        });
    });
  });
});
