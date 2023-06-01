import Form from "./Form"

describe("Form", () => {
  it("renders correctly", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" />
    )
    cy.get("label").should("have.text", "Genre:")
    cy.get("select").should("have.value", "")
    cy.get("select").should("have.text", "-- Select --ActionHorrorSci-FiFantasyFairy Tale")
  });

  it("selects an option", () => {
    cy.mount(
      <Form dropdownItems={["Action", "Horror", "Sci-Fi", "Fantasy", "Fairy Tale"]} selectionField="Genre" />
    )
    cy.get("select").select("Action")
    cy.get("select").should("have.value", "Action")
  });
});
