const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createRequest, getRequests, updateRequest } = require('../controllers/skillExchangeController');

// Create a new skill exchange request
router.post('/', auth, createRequest);

// Get skill exchange requests for a user
router.get('/', auth, getRequests);

// Update a skill exchange request (accept, reject, complete)
router.put('/:id', auth, updateRequest);

module.exports = router;
