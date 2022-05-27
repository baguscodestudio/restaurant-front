import Chance from "Chance";

const chance = new Chance();

for (let count = 0; count < 100; count++) {
  let tablenum = chance.integer({ min: 1, max: 200 });
  let email = chance.email({ domain: "gmail.com" });
  describe(`Generate Data for ${email} in table number ${tablenum}`, () => {
    it("Create Order", () => {
      cy.visit("http://localhost:3000/order");
      cy.get('input[type="number"]').type(tablenum);
      cy.get("button").contains("Create Order").click();
      cy.contains("Menu List").should("exist");
      cy.get("#items-list > div")
        .its("length")
        .then((items) => {
          let loop_items = chance.integer({ min: 1, max: items });
          let start_items = chance.integer({ min: 1, max: loop_items });
          for (let i = start_items; i <= loop_items; i++) {
            let amount = chance.integer({ min: 1, max: 10 });
            cy.get(`#items-list > div:nth-child(${i})`)
              .find('input[type="text"]')
              .type(amount);
            cy.get(`#items-list > div:nth-child(${i})`)
              .contains("Add to cart")
              .click();
          }
          cy.contains("Create Order").click();
        });
    });

    it("Check Order", () => {
      cy.visit("http://localhost:3000/order");
      cy.get('input[type="number"]').type(tablenum);
      cy.get("button").contains("Check Order").click();
      cy.contains("Pay").should("exist");
      cy.contains("Pay").click();
      cy.contains("Table Number").should("exist");
      cy.contains("Payment Total").should("exist");
      cy.get("#card-info").type(chance.cc());
      cy.get("#email").type(email);
      cy.get('button[type="submit"]').click();
    });
  });
}
