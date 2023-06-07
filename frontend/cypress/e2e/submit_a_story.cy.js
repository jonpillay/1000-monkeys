describe("Submitting a story request initially", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("selects the fields and assigns the choices to be stored in local storage", () => {
    cy.getThrough();
    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.prompt).to.equal("going to the shops");
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText);
      });
      cy.get("@imageData").then((data) => {
        expect(storedData.imageHistory[0]).to.equal(data.imgUrl);
      });
    });
  });
});
