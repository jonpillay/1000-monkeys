describe("Submitting a story request initially", () => {
  
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.fixture('images.json').as('imageData')
    cy.fixture('storyChapter1.json').as('storyData')
    })

  it("selects the fields and assigns the choices to be stored in local storage", () => {
    cy.visit("/");
    cy.get('@imageData').then((data) => {
      cy.intercept('POST', '/images', { imgUrl: data.imgUrl }).as("imageRequest")
    })
    cy.get('@storyData').then((data) => {
      cy.intercept('POST', '/story', { storyText: data.storyText }).as("storyRequest")  
    })
    cy.get(":nth-child(1) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-3-listbox").first().click();
    cy.get(":nth-child(2) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-5-listbox").first().click();
    cy.get(":nth-child(3) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-7-listbox").first().click();
    cy.get('.text-input > input').type('going to the shops');
    cy.get('.submit-button').click();
  });
});
