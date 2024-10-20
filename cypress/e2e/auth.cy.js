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

  it('should store token in local storage after logging in with valid credentials', () => {
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

describe('Invalid login test', () => {
  it('should fail the login (error 401 - unauthorized) and show an error message', () => {
    // Visit the login page
    cy.visit('/index.html');

    // Fill out the login form using IDs
    cy.get('#loginEmail').type('fail@stud.noroff.no', { force: true });
    cy.get('#loginPassword').type('invalidPassword', { force: true });

    // Intercept the login request
    cy.intercept(method, API_URL).as('login');

    // Click on the login button using ID
    cy.get('#loginForm').submit();

    // Wait for the login request to fail (err 401)
    cy.wait('@login').its('response.statusCode').should('eq', 401);

    // Making sure the user is alerted with an error message
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
});
