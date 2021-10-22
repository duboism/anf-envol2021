const db = require('../services/db');

/* GET all agents */
async function getAllAgents() {

  const results = await db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status;`
  );

  return results;
};

/* GET one agent */
async function getOneAgent(id_agent) {

  const results = await db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status
    AND id_agent = ?;`,
    [id_agent]
  );

  return results;
};

/* GET all missions of an agent */
async function getAllMissionsAgent(id_agent) {

  const results = await db.query(
    `SELECT country, cost, date_from, date_to
    FROM missions
    WHERE ref_agent = ?;`,
    [id_agent]
  );

  return results;

};

/* GET a mission of a specific agent */
async function getOneMissionAgent(id_agent, id_mission) {

  const results = await db.query(
    `SELECT firstname, lastname, status, cap, country, cost, date_from, date_to
    FROM agents, missions, status
    WHERE ref_agent = ?
    AND id_mission = ?
    AND id_agent = ref_agent
    AND ref_status = id_status;`,
    [id_agent, id_mission]
  );

  return results;

}

module.exports = {
  getAllAgents,
  getOneAgent,
  getAllMissionsAgent,
  getOneMissionAgent
};
