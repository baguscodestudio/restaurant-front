import Chance from "Chance";

const chance = new Chance();

let tablenum = chance.integer({ min: 1, max: 200 });

describe("Customer Make Payment", () => {
  it(`Create Order with Table Number ${tablenum}`, () => {
    cy.visit("http://localhost:3000/order");
    cy.get('input[type="number"]').type(tablenum);
    cy.get("button").contains("Create Order").click();
    cy.contains("Menu List").should("exist");
    cy.get("#items-list > div")
      .its("length")
      .then((items) => {
        let loop_items = chance.integer({ min: 1, max: items });
        for (let i = 1; i <= loop_items; i++) {
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

  it("Make Payment", () => {
    cy.visit("http://localhost:3000/order");
    cy.get('input[type="number"]').type(tablenum);
    cy.get("button").contains("Check Order").click();
    cy.contains("Pay").should("exist");
    cy.contains("Pay").click();
    cy.contains("Table Number").should("exist");
    cy.contains("Payment Total").should("exist");
    cy.get("#card-info").type(chance.cc());
    cy.get("#email").type(chance.email({ domain: "gmail.com" }));
    cy.get('button[type="submit"]').click();
  });
});
