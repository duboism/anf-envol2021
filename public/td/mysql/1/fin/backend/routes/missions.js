const express = require('express');
const router = express.Router();
const db  = require('../services/db');

/* GET missions */
router.get('/:id_mission?', (req, res) => {
  if (req.params.id_mission) {
    db.query(
      `SELECT *
      FROM missions
      WHERE id_mission = ?;`,
      [req.params.id_mission],
      (err, results) => {
        if (err) res.send(err);
        else res.send(results);
      }
    );
  } else {
    db.query(
      `SELECT *
      FROM missions
      ORDER BY country ASC;`,
      (err, results) => {
        if (err) res.send(err);
        else res.send(results);
      }
    );
  }
});

/* POST mission */
router.post('/add', (req, res) => {
  db.query(
    `INSERT INTO missions (ref_agent, country, cost, date_from, date_to)
    VALUES (?, ?, ?, ?, ?);`,
    [req.body.ref_agent,
    req.body.country,
    req.body.cost,
    req.body.date_from,
    req.body.date_to],
    (err, results) => {
      if (err) res.send(err);
      else res.send('Mission created');
    }
  );
});

/* PUT missions */
router.put('/update/:id_mission', (req, res) => {
  db.query(
    `UPDATE missions
    SET ref_agent = ?,
    country = ?,
    cost = ?,
    date_from = ?,
    date_to = ?
    WHERE id_mission = ?;`,
    [req.body.ref_agent,
    req.body.country,
    req.body.cost,
    req.body.date_from,
    req.body.date_to,
    req.params.id_mission],
    (err, results) => {
      if (err) res.send(err);
      else res.send('Mission updated');
    }
  );
});

/* DELETE missions */
router.delete('/del/:id_mission', (req, res) => {
  db.query(
    `DELETE FROM missions
    WHERE id_mission = ?;`,
    [req.params.id_mission],
    (err, results) => {
      if (err) res.send(err);
      else res.send('Mission deleted');
    }
  );
});

module.exports = router;
