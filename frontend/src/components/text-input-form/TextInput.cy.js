import TextInput from "./TextInput";

describe("TextInput component", () => {
  it("should update input value and invoke handleInputChange", () => {
    const handleInputChange = cy.stub();
    const inputValue = "Test Input";

    cy.mount(<TextInput handleInputChange={handleInputChange} />);
    cy.get(".text-input-input").type(inputValue);
    cy.get(".text-input-input").should("have.value", inputValue);
  });
});
