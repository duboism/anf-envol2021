const express = require('express');
const router = express.Router();
const db  = require('../services/db');

/* GET agents */
router.get('/:id_agent?', (req, res) => {
  if (req.params.id_agent) {
    // query
    db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status
    AND id_agent = ?;`,
    [req.params.id_agent],
    (err, results) => {
      if (err) res.send(err);
      else res.send(results);
    });
  } else {
    // query
    db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status
    ORDER BY lastname ASC;`,
    (err, results) => {
      if (err) res.send(err);
      else res.send(results);
    });
  }
});

/* GET missions by agent */
router.get('/:id_agent/missions/:id_mission?', (req, res) => {
  if (req.params.id_mission) {
    // query
    db.query(
    `SELECT firstname, lastname, status, cap, country, cost, date_from, date_to
    FROM agents, missions, status
    WHERE id_mission = ?
    AND ref_agent = ?
    AND id_agent = ref_agent
    AND ref_status = id_status;`,
    [req.params.id_mission, req.params.id_agent],
    (err, results) => {
      if (err) res.send(err);
      else res.send(results);
    });
  } else {

    const agent = {
      'firstname': '',
      'lastname': '',
      'status': '',
      'cap': 0,
      'missions': []
    };
    /* which agent ? */
    db.query(
      `SELECT firstname, lastname, status, cap
      FROM agents, status
      WHERE id_agent = ?
      AND ref_status = id_status;`,
      [req.params.id_agent],
      (err, results) => {
        if (err) res.send(err);
        else {
          agent.firstname = results[0]['firstname']
          agent.lastname = results[0]['lastname'];
          agent.status = results[0]['status'];
          agent.cap = results[0]['cap'];
        }
      }
    );

    /* missions for an agent */
    db.query(
      `SELECT country, cost, date_from, date_to
      FROM missions
      WHERE ref_agent = ?;`,
      [req.params.id_agent],
      (err, results) => {
        if (err) res.send(err);
        else {
          agent.missions = results;
          res.send(agent);
        }
      }
    );
  }
});

module.exports = router;
