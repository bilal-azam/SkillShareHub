const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationAlertSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NotificationAlert', NotificationAlertSchema);
