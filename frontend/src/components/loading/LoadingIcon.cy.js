import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
  it("renders correctly", () => {
    cy.mount(<LoadingIcon />);
    cy.get('.loading-icon')
    .should('be.visible')
    .should('have.attr', 'src')
    .and('include', 'slow-turning-pages.gif')
  });
});
