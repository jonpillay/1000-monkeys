describe("pressing any regen button to get to next step", () => {
  it("should reinstate loading screen", () => {
    cy.getThrough()
    cy.get('[data-cy="next"]').click()
    cy.get('.sub-title').should('have.text', 'Please wait we are crafting your story...');
  })
});