import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
  it("renders correctly", () => {
    cy.mount(<LoadingIcon />);
    cy.get('.sub-title')
      .should('be.visible')
      .should('have.text', 'Please wait we are crafting your story...');
    cy.get('.book').should('be.visible');
  });
});




