import Story from './Story';

describe('Story', () => {
  it('shows the story', () => {
    cy.mount(<Story storyString={"test story"} />);
    cy.get('.story-text')
    .should('be.visible')
    .should('have.text', 'test story')
  })
})
