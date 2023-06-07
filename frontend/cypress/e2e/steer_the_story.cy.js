describe("pressing the steer the story button after submitting story", () => {

  beforeEach(() => {

  })

  it("changes the prompt to user input, saves the message / image history and recalls the api", () => {
    cy.getThrough();
    cy.viewport(1000,1000)
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
    cy.get('[data-cy="steer-initiate"]').click()
    cy.get('input').type("going to the bank")
    cy.get('[data-cy="steer-submit"]').click()

    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.prompt).to.equal(
        "going to the bank"
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
