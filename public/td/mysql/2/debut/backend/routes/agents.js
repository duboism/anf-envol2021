const express = require('express');
const router = express.Router();
const agents = require('../controllers/agents');

/* GET agents */
router.get('/:id_agent?', agents.getAgents);

/* GET missions by agent */
router.get('/:id_agent/missions/:id_mission?', agents.getMissionsAgent);

module.exports = router;
