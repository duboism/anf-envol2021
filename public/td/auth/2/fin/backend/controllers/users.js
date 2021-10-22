const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
  try {
    res.send(await users.getAllUsers());
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send(await users.getUserById(req.params.id_user));
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    res.send(await users.addOneUser(req.body.email, password));
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await users.getUserByEmail(req.body.email);
    if (!user) return res.status(401).send('Utilisateur non trouvé');
    else {
      bcrypt.compare(req.body.password, user.password)
      .then( (result) => {
        if (!result) {
          return res.status(401).send('Mot de passe incorrect !');
        } else {
          res.status(200).send({
            userId: user.id_user,
            token: jwt.sign(
              { userId: user.id_user },
              'SECRET_TOKEN',
              { expiresIn: '24h' }
            )
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  login
};