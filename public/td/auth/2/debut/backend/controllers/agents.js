const agents = require('../models/agents');

const getAgents = async (req, res, next) => {
  try {
    res.send(await agents.getAllAgents());
  } catch (err) {
    next(err);
  }
};

const getAgent = async (req, res, next) => {
  try {
    res.send(await agents.getOneAgent(req.params.id_agent));
  } catch (err) {
    next(err);
  }
};

const getMissionAgent = async (req, res, next) => {
  try {
    res.send(await agents.getOneMissionAgent(req.params.id_agent, req.params.id_mission));
  } catch (err) {
    next(err);
  }
};

const getMissionsAgent = async (req, res, next) => {
  try {
    // which agent?
    const agent = await agents.getOneAgent(req.params.id_agent);
    // which missions?
    const missions = await agents.getAllMissionsAgent(req.params.id_agent);

    res.send({
      'firstname': agent[0]['firstname'],
      'lastname': agent[0]['lastname'],
      'status': agent[0]['status'],
      'cap': agent[0]['cap'],
      'missions': missions
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAgents,
  getAgent,
  getMissionsAgent,
  getMissionAgent
};
