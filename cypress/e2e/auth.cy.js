const email = 'fakeuser2002@stud.noroff.no';
const password = 'fakeuser2002';
const method = 'POST';
const API_URL = 'https://nf-api.onrender.com/api/v1/social/auth/login';

describe('Login Function Test', () => {
  it('should login successfully with correct credentials', () => {
    cy.visit('/index.html');

    // Fill out the login form using IDs
    cy.get('#loginEmail').type(email, { force: true });
    cy.get('#loginPassword').type(password, { force: true });

    // Intercept the login request
    cy.intercept(method, API_URL).as('login');

    // Click on the login button using ID
    cy.get('#loginForm').submit();

    // Wait for the login request to complete
    cy.wait('@login').its('response.statusCode').should('eq', 200);
  });
});
