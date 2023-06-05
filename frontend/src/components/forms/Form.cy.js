import Form from "./Form"

describe("Form", () => {
  it("renders correctly", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" />
    )
    cy.get("label").should("have.text", "Genre:")
    cy.get(".custom-select").should("have.value", "")
    cy.get(".custom-select").should("have.text", "Select...")
  });
});
