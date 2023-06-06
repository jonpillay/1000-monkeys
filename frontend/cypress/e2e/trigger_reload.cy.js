describe("pressing any regen button to get to next step", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should reinstate loading screen", () => {
    // currently not working
    cy.getThrough()
    cy.get('[data-cy="next"]').click()
    cy.get('.sub-title').should('have.text', 'Please wait we are crafting your story...');
  })
});