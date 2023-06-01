import FormContainer from "./FormContainer";

describe("FormContainer", () => {
  it("renders correctly", () => {
    cy.mount(<FormContainer />);
    cy.get(".form-title").should("have.text", "Get started with some details...");
    cy.get("select").should("have.value", "");
    cy.get("select").should("have.text", "-- Select --ActionHorrorSci-FiFantasyFairy Tale-- Select --Mickey MouseBugs BunnyPikachuHomer SimpsonSpongebobRapunzelSuperman-- Select --TescoTrafalgar SquareLondon BridgeLondon Underground-- Select --SteampunkEmoCyberpunkPop ArtGothic");
  })
});
