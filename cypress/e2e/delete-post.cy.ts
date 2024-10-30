describe('Delete post', () => {
  it('Can delete first element', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().first().find('.btn-danger').click()
    cy.get('#deleteModal .btn-danger').click()
    cy.get('.view-posts .row').children().should('have.length', 99)
  })
  it('Can delete 2 items', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().first().find('.btn-danger').click()
    cy.wait(300)
    cy.get('#deleteModal .btn-danger').click()
    cy.wait(300)
    cy.get('.view-posts .row').children().first().find('.btn-danger').click()
    cy.wait(300)
    cy.get('#deleteModal .btn-danger').click()
    cy.get('.view-posts .row').children().should('have.length', 98)
  })
})
