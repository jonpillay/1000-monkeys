import FormContainer from "./FormContainer";

describe("FormContainer", () => {
  it("renders correctly", () => {
    cy.mount(<FormContainer />);
    cy.get(".formcontainer-title").should("have.text", "Get started with some details...");
    cy.get(".css-b62m3t-container").should("have.text", "Select...Select...Select...");
  })
});
