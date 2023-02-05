const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Send a message
router.post('/send', auth, async (req, res) => {
    const { recipientId, content } = req.body;

    try {
        const message = new Message({
            sender: req.user.id,
            recipient: recipientId,
            content: content
        });

        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get messages between two users
router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, recipient: req.params.userId },
                { sender: req.params.userId, recipient: req.user.id }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
