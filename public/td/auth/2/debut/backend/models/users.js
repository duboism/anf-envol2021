const db = require('../services/db');

/* GET one user */
async function getOneUser(id_user) {

  const results = await db.query(
    `SELECT email, password
    FROM users
    WHERE id_user = ?;`,
    [id_user]
  );

  return results;
};

module.exports = {
  getOneUser
};
