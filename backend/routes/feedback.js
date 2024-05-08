const feedbackcontroller =require('../controllers/feedbackController');
const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
// Add feedback
router.post('/submit-feedback',authenticateToken, feedbackcontroller.submitFeedback);

router.get('/getfeedback',authenticateToken,feedbackcontroller.Getfeedback);
module.exports = router;