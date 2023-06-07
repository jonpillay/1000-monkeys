describe("pressing the refresh button after submitting story", () => {
  it("does not save the message history in local storage and submits same API call", () => {
    cy.getThrough();
    cy.fixture("storyChapters.json")
      .as("storyData2")
      .then((data) => {
        cy.intercept("POST", "/story", { storyText: data.storyText2 }).as(
          "storyRequest2"
        );
      });
    cy.fixture("images.json")
    .as("imageData2")
    .then((data) => {
      cy.intercept("POST", "/images", { imgUrl: data.imgUrl2 }).as(
        "imageRequest2"
      );
    });
    cy.get('[data-cy="refresh"]').click();
    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.prompt).to.equal(
        "going to the shops"
      );
      expect(storedData.messageHistory.length).to.equal(1);
      expect(storedData.imageHistory.length).to.equal(1);
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText2);
      });
      cy.get("@imageData").then((data) => {
        expect(storedData.imageHistory[0]).to.equal(data.imgUrl2);
      });
    });
  });
});
