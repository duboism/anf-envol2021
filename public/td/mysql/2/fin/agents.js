const express = require('express');
const router = express.Router();
const db  = require('../services/db');

async function getAllAgents() {
  const rows = await db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status
    ORDER BY lastname ASC`, []);
  return rows;
}

/* GET agents */
router.get('/', async (req, res, next) => {
  try {
    res.send(await getAllAgents());
  } catch (err) {
    next(err);
  }
  /*
    // query
    db.query(
    `SELECT firstname, lastname, status, cap
    FROM agents, status
    WHERE ref_status = id_status
    ORDER BY lastname ASC`,
    (err, results) => {
      res.send(results);
    });
  */
});

module.exports = router;
