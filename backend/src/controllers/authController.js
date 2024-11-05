const jwt = require('jsonwebtoken');
const config = require('../config/default');

const login = (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@example.com' && password === 'password') {
    const token = jwt.sign(
      { email }, 
      config.jwt.secret, 
      { expiresIn: config.jwt.expiresIn }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  login
};