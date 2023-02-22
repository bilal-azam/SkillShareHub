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

  it('should display results for a valid skill search', async () => {
    const skill = 'React';
    const res = await axios.get(`/api/users/search?skill=${skill}`);
    expect(res.data.users.length).toBeGreaterThan(0);
  });
});