describe('View post', () => {
  it('Can view single post', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().first().find('.btn-secondary').click()
    cy.get('.view-post-wrap .h1').contains('View post #1')
    cy.get('.view-post-wrap .btn-secondary').click()
    cy.visit('/')
    cy.wait(300)
    cy.get('.view-posts .row').children().should('have.length', 100)
  })
})
