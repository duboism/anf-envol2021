const express = require('express');
const router = express.Router();
const missions = require('../controllers/missions');

router.get('/', missions.getMissions);
router.get('/:id_mission', missions.getMission);
router.post('/add', missions.addMission);
router.put('/update/:id_mission', missions.updateMission);
router.delete('/del/:id_mission', missions.deleteMission);

module.exports = router;
