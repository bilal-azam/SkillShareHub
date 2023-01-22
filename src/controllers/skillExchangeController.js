const SkillExchange = require('../models/SkillExchange');

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
