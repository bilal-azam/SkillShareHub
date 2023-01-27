const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

// Get all notifications for the logged-in user
router.get('/', auth, getNotifications);

// Mark a notification as read
router.put('/:id/read', auth, markAsRead);

module.exports = router;
