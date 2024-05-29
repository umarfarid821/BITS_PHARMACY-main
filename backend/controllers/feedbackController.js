const FeedbackModel = require('../models/feedbackModel');

// Controller function to handle feedback submissions
const submitFeedback = async (req, res) => {
  try {
    const { c_fname, c_lname, c_email, c_subject, c_message } = req.body;

    // Create a new feedback instance using the model
    const newFeedback = new FeedbackModel({
      name: `${c_fname} ${c_lname}`,
      email: c_email,
      subject: c_subject,
      message: c_message,
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Send a success response
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const Getfeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find();
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error while fetching feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findByIdAndDelete(req.params.id);
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error while deleting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitFeedback,
  Getfeedback,
  deleteFeedback,
};
