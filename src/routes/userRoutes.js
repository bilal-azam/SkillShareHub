const express = require('express');
const { 
  registerUser, 
  loginUser,
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

router.get('/', (req, res) => {
  res.send('User route is working');
});

module.exports = router;
