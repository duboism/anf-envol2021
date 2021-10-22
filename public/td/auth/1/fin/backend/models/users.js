const db = require('../services/db');

/* GET user by id */
async function getUserById(id_user) {

  const results = await db.query(
    `SELECT email, password
    FROM users
    WHERE id_user = ?;`,
    [id_user]
  );

  return results[0];
};

module.exports = {
  getUserById
};
