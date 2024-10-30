describe('Edit post', () => {
  it('Can edit post and return back', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().first().find('.btn-primary').click()
    cy.get('#titleInput').clear()
    cy.get('#titleInput').type('Test title')
    cy.get('#bodyInput').clear()
    cy.get('#bodyInput').type('Test body')
    cy.get('.edit-post .btn-success').click()
    cy.get('.view-posts .row').children().first().find('.card-title').contains('Test title')
    cy.get('.view-posts .row').children().first().find('.card-body').contains('Test body')
  })
})
