const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
   
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
