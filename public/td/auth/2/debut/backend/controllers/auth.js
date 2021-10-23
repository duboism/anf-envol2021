const users = require('../models/users');

const checkAuth = async (req, res, next) => {
  try {
    const user = await users.getUserById(req.body.id_user);
    if (req.body.password == user.password) {
      next();
    } else {
      res.status(401).send('Utilisateur non autorisé.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAuth
};
