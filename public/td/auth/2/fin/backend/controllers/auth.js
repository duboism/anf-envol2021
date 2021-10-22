const users = require('../models/users');
const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_TOKEN');
    const userId = decodedToken.userId;
    const user = await users.getUserById(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAuth
};
