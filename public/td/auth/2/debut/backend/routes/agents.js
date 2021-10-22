const express = require('express');
const router = express.Router();
const agents = require('../controllers/agents');

router.get('/', agents.getAgents);
router.get('/:id_agent', agents.getAgent);
router.get('/:id_agent/missions', agents.getMissionsAgent);
router.get('/:id_agent/missions/:id_mission', agents.getMissionAgent);

module.exports = router;
