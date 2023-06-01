import Image from './image'

describe('Image', () => {
  it('shows the image', () => {
    cy.mount(<Image link={"testImage.png"} />);
    cy.get('.story-image')
    .should('be.visible')
    .should('have.attr', 'src')
    .and('include', 'testImage.png')
  })
})
