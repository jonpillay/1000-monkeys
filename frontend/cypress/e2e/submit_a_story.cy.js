describe("Submitting a story request initially", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("selects the fields and assigns the choices to be stored in local storage", () => {
    cy.getThrough();
    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.character).to.equal("Homer Simpson");
      expect(storedData.genre).to.equal("dystopia");
      expect(storedData.style).to.equal("photorealistic");
      expect(storedData.prompt).to.equal("going to the shops");
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText);
      });
    });
  });
});
