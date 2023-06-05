describe('Submitting a story request initially', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("selects the fields and assigns the choices to be stored in local storage", () => {
    cy.visit("/")
    cy.get('.text-input > input')
  })
})