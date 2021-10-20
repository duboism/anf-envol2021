const missions  = require('../models/missions');

const getMissions = async (req, res, next) => {
  try {
    res.send(await missions.getAllMissions());
  } catch (err) {
    next(err);
  }
};

const getMission = async (req, res, next) => {
  try {
    res.send(await missions.getOneMission(req.params.id_mission));
  } catch (err) {
    next(err);
  }
};

const addMission = async (req, res, next) => {
  try {
    res.send(await missions.addOneMission(req.body));
  } catch (err) {
    next(err);
  }
};

const updateMission = async (req, res, next) => {
  try {
    res.send(await missions.updateOneMission(req.body, req.params.id_mission));
  } catch (err) {
    next(err);
  }
};

const deleteMission = async (req, res, next) => {
  try {
    res.send(await missions.deleteOneMission(req.params.id_mission));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMissions,
  getMission,
  addMission,
  updateMission,
  deleteMission
};
