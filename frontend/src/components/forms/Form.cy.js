import Form from "./Form"

describe("Form", () => {
  it("renders correctly", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" />
    )
    cy.get("label").should("have.text", "Select Genre:")
    cy.get("select").should("have.value", "")
    cy.get("select").should("have.text", "-- Select --ActionHorrorSci-FiFantasyFairy Tale")
  });

  it("renders correctly with a selected value", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" selectedValue="Horror" />
    )
    cy.get("select").should("have.value", "Horror")
  })
});
