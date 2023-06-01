import Form from "./Form"

describe("Form", () => {
  it("calls the / endpoint", () => {
    let genres;

    cy.mount(
      <Form dropdownItems={genres} selectionField="Genre" />
    )

    cy.get("#comment").type("this is a test message");
    cy.get("#submit-comment").click();
    cy.wait('@createCommentRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK");
      expect(interception.request.body.comment).to.eq("this is a test message");
    })
  })
})




// label is correct: field is Genre when field is clicked
// right field is appearing when rendering the component
// clicking dropdown shows the right things appearing