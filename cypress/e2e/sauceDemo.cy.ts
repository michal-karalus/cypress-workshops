import LoginPage from "../pages/login.po";

describe("Sauce Demo", () => {
  beforeEach(() => {
    LoginPage.login();
  });

  it("should add item and complete order", () => {
    cy.get(`[data-test=add-to-cart-sauce-labs-bolt-t-shirt]`).click();
    cy.get('.shopping_cart_badge').should("have.text", "1");
    cy.get('.shopping_cart_link').click();
    cy.get(".inventory_item_name").should(
      "have.text",
      "Sauce Labs Bolt T-Shirt"
    );
    cy.get("[data-test=checkout]").click();
    cy.get("[data-test=firstName]").type("john");
    cy.get("[data-test=lastName]").type("doe");
    cy.get("[data-test=postalCode]").type("1234");
    cy.get("[data-test=continue]").click();
    cy.get("[data-test=finish]").click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });

  it("should sort items in descending price order", () => {
    cy.get("[data-test=product_sort_container]").select("hilo");
    cy.get(".inventory_item_price").each(($el, idx, $list) => {
      if (idx === 0) return;
      cy.wrap($el)
        .invoke("text")
        .then((current) => {
          const previous = $list[idx - 1].textContent;
          const currentPrice = Number(current.replace('$', ''));
          const previousPrice = Number(previous.replace('$', ''));
          expect(currentPrice).to.be.lte(previousPrice);
        });
    });
  });
});
