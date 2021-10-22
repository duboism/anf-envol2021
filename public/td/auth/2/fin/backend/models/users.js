const db = require('../services/db');

/* GET all users */
async function getAllUsers() {

  const results = await db.query(
    `SELECT email, password
    FROM users
    ORDER BY email ASC;`
  );

  return results;
};

/* GET one user */
async function getUserById(id_user) {

  const results = await db.query(
    `SELECT email, password
    FROM users
    WHERE id_user = ?;`,
    [id_user]
  );

  return results;
};

/* POST user */
async function addOneUser(email, password) {

  const results = await db.query(
    `INSERT INTO users (email, password)
    VALUES (?, ?);`,
    [email, password]
  );

  return "User created";
};

/* POST user by email */
async function getUserByEmail(email) {

  const results = await db.query(
    `SELECT id_user, password
    FROM users
    WHERE email = ?;`,
    [email]
  );

  return results[0];
};

module.exports = {
  getUserById,
  getUserByEmail,
  getAllUsers,
  addOneUser
};
