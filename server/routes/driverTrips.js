const express = require('express')
const router = express.Router();
const dbActions = require("../database/api");

//UPDATE STATUS ON MANIFESTED SHIPMENTS

router.post('/', (req, res) => {
  const {driver_id, date, pros, zone} = req.body;

  dbActions.createDriverTrip(driver_id, date, JSON.stringify(pros),zone, (err, rows) => {
    if(err) console.log(err)
    res.send(rows)
  })
  //need to also change status on these to OFD
})

module.exports = router;