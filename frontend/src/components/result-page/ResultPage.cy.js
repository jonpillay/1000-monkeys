import ResultPage from "./ResultPage";

describe("ResultPage", () => {
  it("shows the result page", () => {
    cy.mount(<ResultPage />);
    cy.get(".result-page").should("be.visible");
    cy.get(".result-page").should("contain", "Here's your story!");
    cy.get(".container").should("be.visible");
  });
});
