const express = require('express');
const router = express.Router();
const missions = require('../controllers/missions');

/* GET missions */
router.get('/:id_mission?', missions.getMissions);

/* POST mission */
router.post('/add', missions.addMission);

/* PUT missions */
router.put('/update/:id_mission', missions.updateMission);

/* DELETE missions */
router.delete('/del/:id_mission', missions.deleteMission);

module.exports = router;
