describe('View post', () => {
  it('Can view single post', () => {
    cy.visit('/')
    cy.get('.view-posts .row').children().first().find('.btn-secondary').click()
  })
})
