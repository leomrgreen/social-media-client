import { logout } from '../js/api/auth/logout.js';
import { remove } from '../js/storage/index.js';

// Mock the remove function from our storage module
jest.mock('../js/storage/index.js', () => ({
  remove: jest.fn(),
}));

describe('logout', () => {
  beforeEach(() => {
    // Clear any previous calls to the mocked remove function
    remove.mockClear();
  });

  it('should remove token and profile from local storage when called', () => {
    // Call the logout function
    logout();

    // Check if the remove function was called with correct argument (the token in storage)
    expect(remove).toHaveBeenCalledWith('token');
  });
});
