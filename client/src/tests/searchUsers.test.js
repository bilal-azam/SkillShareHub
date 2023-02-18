const { searchUsers } = require('../controllers/userController');

describe('Search Users', () => {
  it('should return users with matching skills', async () => {
    const req = { query: { skill: 'JavaScript' } };
    const res = {
      json: jest.fn(),
    };

    await searchUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});