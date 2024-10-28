describe('Show posts page', () => {
  it('Can scroll to the last element', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().last().contains('ID: 100').click()
  })
  it('Contains 100 elements', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().should('have.length', 100)
  })
})
