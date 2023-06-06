import HomeButton from "./HomeButton";

describe("HomeButton", () => {
  it("shows the home button when loaded", () => {
    cy.mount(<HomeButton navigate={() => {}} />);

    cy.get(".home-button-container").should("be.visible");
    cy.get(".home-button").should("be.visible");
    cy.get(".home-icon").should("be.visible");
  });

  it("navigates to the home page when clicked", () => {
    const navigate = cy.stub();
   cy.mount(<HomeButton navigate={navigate} />);

    cy.get(".home-button").click().then(() => {
      expect(navigate).to.be.calledWith("/");
    });
  });
});
