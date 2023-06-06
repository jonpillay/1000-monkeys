describe("pressing the next button after submitting story", () => {
  it("saves the message history in local storage and changes the prompt", () => {
    cy.getThrough()
    let chapter2;
    cy.fixture("storyChapter2.json").as("storyData2").then((data) => {
      chapter2 = data.storyText
    });
      cy.intercept("POST", "/story", { storyText: chapter2 }).as(
        "storyRequest"
      );
    cy.get('[data-cy="next"]').click()
    cy.window().then((win) => {
      const storedData = JSON.parse(win.localStorage.getItem("userChoices"));
      expect(storedData.prompt).to.equal("what you think will happen in the next chapter based on the history you received")
      expect(storedData.messageHistory.length).to.equal(2)
      cy.get("@storyData").then((data) => {
        expect(storedData.messageHistory[0]).to.equal(data.storyText);
      });
      expect(storedData.messageHistory[1]).to.equal(chapter2)
    });
  })
});
