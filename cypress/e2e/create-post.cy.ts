describe('Create post', () => {
  it('Can create post and return back', () => {
    cy.visit('/')
    cy.get('.view-posts .create-post-btn').click()
    cy.get('#titleInput').type('Test title')
    cy.get('#bodyInput').type('Test body')
    cy.get('.create-post .btn-primary').click()
    cy.get('.view-posts .row').children().should('have.length', 101)
  })
})
