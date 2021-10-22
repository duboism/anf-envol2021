const express = require('express');
const router = express.Router();
const missions = require('../controllers/missions');
const auth = require('../controllers/auth');

router.get('/', missions.getMissions);
router.get('/:id_mission', missions.getMission);
router.post('/add', auth.checkAuth, missions.addMission);
router.put('/update/:id_mission', auth.checkAuth, missions.updateMission);
router.delete('/del/:id_mission', auth.checkAuth, missions.deleteMission);

module.exports = router;
