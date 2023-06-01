import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    cy.mount(<App />);
    cy.get('.page-title').should('have.text', 'AI-Tistic Tales');
    cy.get('.form-title').should('have.text', 'Get started with some details...');
    cy.get('.submit-button').should('have.text', 'Submit');
  })
});