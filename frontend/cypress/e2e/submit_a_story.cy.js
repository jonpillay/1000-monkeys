describe("Submitting a story request initially", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("selects the fields and assigns the choices to be stored in local storage", () => {
    cy.fixture("images.json").as("imageData");
    cy.fixture("storyChapter1.json").as("storyData");
    cy.visit("/");
    cy.get("@imageData").then((data) => {
      cy.intercept("POST", "/images", { imgUrl: data.imgUrl }).as(
        "imageRequest"
      );
    });
    cy.get("@storyData").then((data) => {
      cy.intercept("POST", "/story", { storyText: data.storyText }).as(
        "storyRequest"
      );
    });
    cy.get(":nth-child(1) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-3-listbox").type("Pikachu{enter}");
    cy.get(":nth-child(2) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-5-listbox").first().click();
    cy.get(":nth-child(3) > .custom-select > .css-13cymwt-control").click();
    cy.get("#react-select-7-listbox").first().click();
    cy.get(".text-input > input").type("going to the shops");
    cy.get(".submit-button").click();

    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.character).to.equal("Pikachu");
      expect(storedData.genre).to.equal("fairytale");
      expect(storedData.style).to.equal("photorealistic");
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText);
      });
    });
  });
});
