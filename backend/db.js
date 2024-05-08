const mongoose = require('mongoose');

const connect = () => {
  const uri = process.env.MONGO_URI; // Use your environment variable or provide the URI directly
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
};

module.exports = {
  connect, // Export the connect function
};
