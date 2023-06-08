import Form from "./Form"

describe("Form", () => {
  it("renders correctly", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" />
    )
    cy.get("label").should("have.text", "Genre:")
    cy.get(".css-b62m3t-container").should("have.value", "")
    cy.get(".css-b62m3t-container").should("have.text", "Select...")
  });
});
