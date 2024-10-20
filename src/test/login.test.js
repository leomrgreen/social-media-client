import { login } from '../js/api/auth/login.js';
import { save } from '../js/storage/index.js';

// Mock the fetch function to simulate API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        accessToken: 'fake-token',
        name: 'fake-user',
      }),
  }),
);

// Mock the save and load functions from our storage module
jest.mock('../js/storage/save.js', () => ({
  save: jest.fn(),
}));

describe('login', () => {
  it('should store a token and the username when provided with valid credentials', async () => {
    const email = 'test@stud.noroff.no';
    const password = 'fakepassword';

    // Call the login function
    const profile = await login(email, password);

    // Check if the 'save' function was called with correct token and profile
    expect(save).toHaveBeenCalledWith('token', 'fake-token');
    expect(save).toHaveBeenCalledWith('profile', { name: 'fake-user' });

    // Check if the returned profile is correct
    expect(profile).toEqual({ name: 'fake-user' });
  });
});
