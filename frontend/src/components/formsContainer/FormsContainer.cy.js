// import FormsContainer from "./FormsContainer";

// describe('FormsContainer', () => {
//   beforeEach(() => {
//     cy.visit('/'); // Replace '/path-to-your-app' with the actual path to your application
//   });

//   it('should select a character', () => {
//     const selectedCharacter = 'Mickey Mouse';

//     cy.get('#character').select(selectedCharacter);
//     cy.get('p').should('have.text', `Selected: ${selectedCharacter}`);
//   });

//   it('should clear character selection', () => {
//     const selectedCharacter = 'Mickey Mouse';

//     cy.get('#character').select(selectedCharacter);
//     cy.get('p').should('have.text', `Selected: ${selectedCharacter}`);

//     cy.contains('Clear Selection').click();
//     cy.get('p').should('not.exist');
//   });

//   it('should create a story', () => {
//     const selectedCharacter = 'Mickey Mouse';

//     cy.get('#character').select(selectedCharacter);
//     cy.contains('Create Your Story!').click();

//     // Add your assertions for story creation, such as checking if the story is displayed or redirected to a new page
//   });
// });
