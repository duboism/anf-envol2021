const express = require('express');
const router = express.Router();
const agents = require('../controllers/agents');
const auth = require('../controllers/auth');

router.get('/', auth.checkAuth, agents.getAgents);
router.get('/:id_agent', auth.checkAuth, agents.getAgent);
router.get('/:id_agent/missions', auth.checkAuth, agents.getMissionsAgent);
router.get('/:id_agent/missions/:id_mission', auth.checkAuth, agents.getMissionAgent);

module.exports = router;
