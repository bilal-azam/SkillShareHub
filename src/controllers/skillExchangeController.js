const SkillExchange = require('../models/SkillExchange');
const Notification = require('../models/Notification');

// Create a new skill exchange request
exports.createRequest = async (req, res) => {
  const { recipient, skill, message } = req.body;

  try {
    const newRequest = new SkillExchange({
      requester: req.user.id,
      recipient,
      skill,
      message
    });

    const savedRequest = await newRequest.save();
    res.json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get skill exchange requests for the logged-in user
exports.getRequests = async (req, res) => {
  try {
    const requests = await SkillExchange.find({
      $or: [{ requester: req.user.id }, { recipient: req.user.id }]
    }).populate('requester recipient', 'name email');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a skill exchange request
exports.updateRequest = async (req, res) => {
  const { status, scheduledDate } = req.body;

  try {
    let request = await SkillExchange.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.recipient.toString() !== req.user.id && request.requester.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status || request.status;
    request.scheduledDate = scheduledDate || request.scheduledDate;

    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new notification
const createNotification = async (user, message) => {
  try {
    const notification = new Notification({ user, message });
    await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error.message);
  }
};

// Example: Notify recipient when a new skill exchange request is created
exports.createRequest = async (req, res) => {
  const { recipient, skill, message } = req.body;

  try {
    const newRequest = new SkillExchange({
      requester: req.user.id,
      recipient,
      skill,
      message
    });

    const savedRequest = await newRequest.save();

    // Notify the recipient
    await createNotification(recipient, `You have a new skill exchange request to teach ${skill}.`);

    res.json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Example: Notify requester when the status of their request changes
exports.updateRequest = async (req, res) => {
  const { status, scheduledDate } = req.body;

  try {
    let request = await SkillExchange.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.recipient.toString() !== req.user.id && request.requester.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status || request.status;
    request.scheduledDate = scheduledDate || request.scheduledDate;

    await request.save();

    // Notify the requester
    await createNotification(request.requester, `Your skill exchange request to learn ${request.skill} has been ${status}.`);

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};