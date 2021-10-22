const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const auth = require('../controllers/auth');

router.get('/', auth.checkAuth, users.getUsers);
router.get('/:id_user', auth.checkAuth, users.getUser);
router.post('/add', auth.checkAuth, users.addUser);
router.post('/login', users.login);

module.exports = router;
