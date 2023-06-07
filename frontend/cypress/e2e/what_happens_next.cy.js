describe("pressing the next button after submitting story", () => {
  it("saves the message history in local storage and changes the prompt", () => {
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
    cy.get('[data-cy="next"]').click();
    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.prompt).to.equal(
        "what you think will happen in the next chapter based on the history you received"
      );
      expect(storedData.messageHistory.length).to.equal(2);
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText);
        expect(storedData.messageHistory[1]).to.equal(data.storyText2);
      });
      cy.get("@imageData").then((data) => {
        expect(storedData.imageHistory[0]).to.equal(data.imgUrl);
        expect(storedData.imageHistory[1]).to.equal(data.imgUrl2);
      });
    });
  });
});
