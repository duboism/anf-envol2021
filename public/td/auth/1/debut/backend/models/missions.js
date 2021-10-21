const db = require('../services/db');

/* GET all missions */
async function getAllMissions() {

  const results = await db.query(
    `SELECT *
    FROM missions
    ORDER BY country ASC;`
  );

  return results;
};

/* GET a specific mission */
async function getOneMission(id_mission) {

  const results = await db.query(
    `SELECT *
    FROM missions
    WHERE id_mission = ?;`,
    [id_mission]
  );

  return results;
};

/* POST mission */
async function addOneMission(data) {

  const results = await db.query(
    `INSERT INTO missions (ref_agent, country, cost, date_from, date_to)
    VALUES (?, ?, ?, ?, ?);`,
    [data.ref_agent,
    data.country,
    data.cost,
    data.date_from,
    data.date_to]
  );

  return "Mission created";
};

/* PUT mission */
async function updateOneMission(data, id_mission) {

  const results = await db.query(
    `UPDATE missions
    SET ref_agent = ?,
    country = ?,
    cost = ?,
    date_from = ?,
    date_to = ?
    WHERE id_mission = ?;`,
    [data.ref_agent,
    data.country,
    data.cost,
    data.date_from,
    data.date_to,
    id_mission]
  );

  return "Mission updated";
};

/* DELETE mission */
async function deleteOneMission(id_mission) {

  const results = await db.query(
    `DELETE FROM missions
    WHERE id_mission = ?;`,
    [id_mission]
  );

  return "Mission deleted";
};

module.exports = {
  getAllMissions,
  getOneMission,
  addOneMission,
  updateOneMission,
  deleteOneMission
};
