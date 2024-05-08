const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const authenticateToken = (req, res, next) => {
  console.log(req.header);
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
   
    const token1 = token.split('Bearer ')[1];
    console.log(token1);

    const decoded = jwt.verify(token1, JWT_SECRET);
    console.log(decoded);
    req.email = decoded.email; // Attach the decoded user info to the request object
    next();
  } catch (error) {
    console.error('Error while verifying token:', error);
    res.status(401).json({ message: error.message || 'Invalid authorization token }' });
  }
};

module.exports = {
  authenticateToken,
};
