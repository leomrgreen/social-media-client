const email = 'fakeuser2002@stud.noroff.no';
const password = 'fakeuser2002';
const method = 'POST';
const API_URL = 'https://nf-api.onrender.com/api/v1/social/auth/login';

describe('Login & Logout test', () => {
  beforeEach(() => {
    // Visit the login page
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

  it('should store token in local storage after login', () => {
    // Check if token is stored in localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
    });
  });

  it('should logout and remove the stored token from local storage', () => {
    // Check if token is stored in localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
    });

    // Click on the logout button to logout
    cy.get('button[data-auth="logout"]').click({ force: true });

    // Check if token is properly removed from LocalStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });
  });
});
