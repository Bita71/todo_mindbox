describe("Test App", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input").type("First Task");
    cy.get("form").submit();
  });

  it("Check Add Task", () => {
    cy.get("#tasksList").children().should("have.length", 1);
  });

  it("Check Change Status Task", () => {
    cy.get("#tasksList").children().first().click();
    cy.get("#tasksList").children().first().should("have.class", "complete");
    cy.get("#tasksList").children().first().click();
    cy.get("#tasksList")
      .children()
      .first()
      .should("not.have.class", "complete");
  });

  it("Check Change Filter Tasks", () => {
    cy.get("#tasksList").children().first().click();
    cy.get("#active").children().first().next().click();
    cy.get("#tasksList").children().should("have.length", 0);
    cy.get("#active").children().first().next().next().click()
    cy.get("#tasksList").children().should("have.length", 1);
    cy.get("#tasksList").children().first().click();
    cy.get("#tasksList").children().should("have.length", 0);
    cy.get("#active").children().first().click()
    cy.get("#tasksList").children().should("have.length", 1);
  });

  it("Check Clear Completed Tasks", () => {
    cy.get("input").type("Second Task");
    cy.get("form").submit();
    cy.get("input").type("Third Task");
    cy.get("form").submit();
    cy.get("#tasksList").children().first().click();
    cy.get('#clear').click()
    cy.get("#tasksList").children().should("have.length", 2);
  });
});
