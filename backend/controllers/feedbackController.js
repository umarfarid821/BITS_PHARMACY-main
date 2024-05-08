const FeedbackModel = require('../models/feedbackModel');

// Controller function to handle feedback submissions
const submitFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    // Create a new feedback instance using the model
    const newFeedback = new FeedbackModel({
      name,
      email,
      feedback,
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

const Getfeedback=async(req,res)=>{
  try{
    const feedback=await FeedbackModel.find();
    res.status(200).json(feedback);
  }catch(error){
    console.error('Error while fetching feedback:',error);
    res.status(500).json({message:'Server error'});
  }
};

module.exports = {
  submitFeedback,
  Getfeedback
};
