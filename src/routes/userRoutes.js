const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/', (req, res) => {
  res.send('User route is working');
});

module.exports = router;
