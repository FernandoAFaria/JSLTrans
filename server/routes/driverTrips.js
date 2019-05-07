const express = require('express')
const router = express.Router();
const dbActions = require("../database/api");

//UPDATE STATUS ON MANIFESTED SHIPMENTS

router.post('/', (req, res) => {
  const {
    driverId,
    date,
    pros,
    zone
  } = req.body;

  dbActions.createDriverTrip(driverId, date, JSON.stringify(pros), zone, (err, rows) => {
    if (err) console.log(err)
    res.send(rows)
  })
  //need to also change status on these to OFD
})

module.exports = router;