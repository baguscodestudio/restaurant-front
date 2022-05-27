import Chance from "Chance";
import { TableInsertColumn } from "styled-icons/fluentui-system-regular";

const chance = new Chance();

let tablenum = chance.integer({ min: 1, max: 200 });

describe("Customer Add Cart & Create Order", () => {
  it(`Create Order with Table Number ${TableInsertColumn}`, () => {
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
});
