context('Login Page', () => {
   it('loads the sign in buttons', () => {
      cy.visit('http://localhost:3000')
      cy.get('button').contains('Sign In With Google').should('be.visible')
   })
})
